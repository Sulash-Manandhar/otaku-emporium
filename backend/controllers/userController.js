const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const emailValidator = require("email-validator");
const OPT = require("../models/optModel");
const hbs = require("nodemailer-express-handlebars");
const logger = require("../utils/Logger");
const { response } = require("express");

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
  logger.info("User is registering...");

  //validation check
  if (!name || !email || !password) {
    logger.error("Details are missing");
    res.status(400);
    throw new Error("Please fill all fields.");
  }
  if (name.length <= 3) {
    logger.error("Username should be atleast three characters long.");
    res.status(400);
    throw new Error("User name should be atleast three characters long.");
  }

  if (!passwordValidation(password)) {
    logger.error(
      "Password must contain at least 8 characters, a capital letter, a symbol and a number."
    );
    res.status(400);
    throw new Error(
      "Password must contain at least 8 characters, a capital letter, a symbol and a number."
    );
  }

  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    logger.error(`'${userExists.email}' is already registered.`);
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
    logger.error(`User ${email} registrated Failed.`);
    res.status(500);
    throw new Error(`User ${email} registrated Failed.`);
  }
  logger.info(`'${user.name}' has been successfully registered.`);
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

  logger.info(`User is logging In..`);

  if (!email || !password) {
    logger.error(`Details are missing..`);
    res.status(400);
    throw new Error(`Details are missing.`);
  }

  const user = await User.findOne({ email });
  if (!user) {
    logger.error(`User with email '${email}' is not registered.`);
    res.status(404);
    throw new Error(`User with email '${email}' is not registered.`);
  }

  if (await bcrypt.compare(password, user.password)) {
    if (!user.verification) {
      logger.error(`User with email '${email}' is not verified.`);
      return res.status(401).json({
        message: `User with email '${email}' is not verified.`,
        user: { _id: user.id, name: user.name, email: user.email },
      });
    }

    logger.info(`User is logged in.`);
    return res.status(201).json({
      user: { _id: user.id, name: user.name, email: user.email },
      token: generateToken(user._id, user.email, remember),
    });
  } else {
    logger.error(`User '${email}' password do not match.`);
    res.status(400);
    throw new Error("Password do not match.");
  }
});

//@desc Get User Data
//@route Get/api/users/me
const getMe = asyncHandler(async (req, res) => {
  logger.info("Logged in user details...");
  const { _id, name, email } = await User.findById(req.user.id);
  logger.info("Logged in user details sent..");
  res.status(200).json({
    user: { _id: _id, name: name, email: email },
    message: "User is logged in",
  });
});

//@desc POST Generate 6 digit OTP code
//@route POST /api/users/send-verification-code
const sendVerificationCode = asyncHandler(async (req, res) => {
  logger.info("Sending verification code..");
  const email = req.body.email;
  //if email address is missing
  if (!email) {
    logger.error("Email address is empty.");
    res.status(400);
    throw new Error("Email address is required.");
  }

  //validates email address
  if (!emailValidator.validate(email)) {
    logger.error("Invalid Email Address.");
    res.status(400);
    throw new Error("Invalid Email Address.");
  }

  //validate user
  const user = await User.findOne({ email });
  if (!user) {
    logger.error(`User with '${email}' is not registered.`);
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
    logger.error("Error while generating OPT code.");
    res.status(500);
    throw new Error("Error while generating OPT code.");
  }
  logger.info("OPT code generated..");

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
      logger.error("Error while sending email.");
      logger.error(error);
      return res.status(500).json({
        message: error.response,
      });
    }
    logger.info(info);
    logger.info(`The email has been sent to ${email}`);
    res.status(200).json({
      message: `The email has been sent to ${email}`,
    });
  });
});

//@desc POST Verify OPT code
//@route POST /api/users/verify-opt-code
const verifyOPTCode = asyncHandler(async (req, res) => {
  logger.info("Verifying user OPT code...");

  const { user_id, code } = req.body;

  if (!user_id || !code) {
    logger.error("Details are missing.");
    res.status(400);
    throw new Error(`Fields are missing.`);
  }

  if (user_id.length < 12) {
    logger.error("Invalid user id.");
    res.status(400);
    throw new Error("Invalid User id.");
  }

  //is user registered
  const user = await User.findById(user_id);
  if (!user) {
    logger.info(`User id ${user_id} is not registered.`);
    res.status(400);
    throw new Error(`User id ${user_id} is not registered.`);
  }
  //if user is already verified
  if (user.verification) {
    logger.info(`User ${user.name} is already verified.`);
    res.status(200).json({
      message: `User ${user.name} is already verified.`,
    });
  }

  //verification email sent to the user?
  const optUser = await OPT.findOne({ user_id });
  if (!optUser) {
    logger.info(`Verification email is yet ot be sent to the user.`);
    res.status(400);
    throw new Error(`Verification email is yet to be send to the user.`);
  }
  if (code !== optUser.opt_code) {
    logger.info("Invalid verification code.");
    res.status(400);
    throw new Error(`Invalid verification code.`);
  }

  //updating user verification code.
  const updateUser = await User.findByIdAndUpdate(
    user_id,
    { verification: true },
    { new: false }
  );
  if (!updateUser) {
    logger.info("Error while updating user verification status.");
    res.status(500);
    throw new Error("Error while updating user verification status.");
  }
  await optUser.remove();
  if (!optUser) {
    logger.error("Failed to delete existing opt.");
  }

  logger.info("User verification status updated successfully.");
  res.status(200).json({
    message: "User verification status updated successfully.",
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  sendVerificationCode,
  verifyOPTCode,
};
