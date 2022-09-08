const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const emailValidator = require("email-validator");
const OPT = require("../models/optModel");
const hbs = require("nodemailer-express-handlebars");

// Nodemailer setup
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

//template options
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: "./backend/views",
      defaultLayout: false,
    },
    viewPath: "./backend/views",
    extName: ".handlebars",
  })
);

//@desc UTILS
//Generate JWT
const generateToken = (id, email, remember) => {
  const expTime = remember ? "15d" : "1d";
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: expTime,
  });
};

//@desc UTILS
//Generate OTP code
const generateOTP = () => {
  otp = Math.floor(Math.random() * 10000) + 99999;
  return otp;
};

//Match regrex
const passwordValidation = (password) => {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/g;
  const found = password.match(pattern);
  return found === null ? false : true;
};

//@desc Register User
//@route POST/api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation check
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields.");
  }
  if (name.length <= 3) {
    res.status(400);
    throw new Error("User name should be atleast three characters long.");
  }

  if (!passwordValidation(password)) {
    res.status(400);
    throw new Error(
      "Password must contain at least 8 characters, a capital letter, a symbol and a number."
    );
  }

  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error(`'${userExists.email}' is already registered.`);
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //register user data into db
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(500);
    throw new Error(`User ${email} registrated Failed.`);
  }
  res.status(201).json({
    user: {
      _id: user.id,
      name: user.name,
      email: user.email,
    },
    message: `'${user.name}' has been successfully registered.`,
  });
});

//@desc Authenticate a User
//@route POST/api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const remember = req.body.remember || false;
  if (!email || !password) {
    res.status(400);
    throw new Error(`Details are missing.`);
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error(`User with email '${email}' is not registered.`);
  }

  if (await bcrypt.compare(password, user.password)) {
    if (!user.verification) {
      return res.status(401).json({
        message: `User with email '${email}' is not verified.`,
        user: { _id: user.id, name: user.name, email: user.email },
      });
    }
    return res.status(201).json({
      user: { _id: user.id, name: user.name, email: user.email },
      token: generateToken(user._id, user.email, remember),
    });
  } else {
    res.status(400);
    throw new Error("Password do not match.");
  }
});

//@desc Get User Data
//@route Get/api/users/me
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    user: { _id: _id, name: name, email: email },
    message: "User is logged in",
  });
});

//@desc Generate 6 digit OTP code
//@route /api/users/send-verification-code
const sendVerificationCode = asyncHandler(async (req, res) => {
  const email = req.body.email;
  //if email address is missing
  if (!email) {
    res.status(400);
    throw new Error("Email address is required.");
  }

  //validates email address
  if (!emailValidator.validate(email)) {
    res.status(400);
    throw new Error("Invalid Email Address.");
  }

  //validate user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error(`User with '${email}' is not registered.`);
  }
  //check if verification code is already sent to the user
  const alreadySent = await OPT.findOne({ user_id: user.id });
  //if verification is already sent it removes it
  if (alreadySent) {
    await alreadySent.remove();
  }
  //add opt to the database
  const code = await OPT.create({
    user_id: user.id,
    opt_code: generateOTP(),
  });
  if (!code) {
    res.status(500);
    throw new Error("Error while generating code.");
  }

  //mail format
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Otaku Emporium - Verify Your Email Address", //Subject Line
    template: "VerificationCode",
    context: {
      opt_code: code.opt_code,
      email: email,
    },
    attachments: [
      {
        filename: "OpenEmail.jpg",
        path: "./backend/assests/jpg/OpenEmail.jpg",
        cid: "openEmail",
      },
    ],
  };

  //sends mail to the defined email address
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: error.response,
      });
    }
    console.log(info);
    res.status(200).json({
      message: `The email has been sent to ${email}`,
    });
  });
});

//@desc Verify OPT code
//@route /api/users/verify-opt-code/:id
const verifyOPTCode = asyncHandler(async (req, res) => {
  const { user_id, code } = req.body;
  if (!user_id || !code) {
    res.status(400);
    throw new Error(`Fields are missing.`);
  }

  const optUser = await OPT.findOne({ optUser_id });
  if (!optUser) {
    res.status(400);
    throw new Error(`Verification Code has not been sent.`);
  }
  if (code !== optUser.opt_code) {
    res.status(400);
    throw new Error(`Invalid verification code.`);
  }
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  sendVerificationCode,
  verifyOPTCode,
};
