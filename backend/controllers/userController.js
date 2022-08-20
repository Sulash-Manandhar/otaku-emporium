const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

//@desc UTILS
//Generate JWT
const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
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
    throw new Error("Please fill all fields");
  }
  if (name.length <= 3) {
    res.status(400);
    throw new Error("User name should be atleast three characters long.");
  }

  if (!passwordValidation(password)) {
    res.status(400);
    throw new Error(
      "Passwords should be atleast 8 characters long, at least 1 letter, 1 number and 1 special character."
    );
  }

  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
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
  if (user) {
    res.status(201).json({
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
      message: `${user.name} has been successfully registered.`,
    });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error(`User ${email} registrated Failed.`);
    }
  }
});

//@desc Authenticate a User
//@route POST/api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error(`User with email ${email} is not registered.`);
  }

  if (!user.verification) {
    res.status(400);
    throw new Error(`User with email ${email} is not verified.`);
  }
  if (await bcrypt.compare(password, user.password)) {
    res.status(201).json({
      user: { _id: user.id, name: user.name, email: user.email },
      token: generateToken(user._id, user.email),
    });
  } else {
    res.status(400);
    throw new Error("Password do not match");
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
//@route /api/users/otp
let transporter = nodemailer.createTransport({
  host:'official.otakuemporium@gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'official.otakuemporium@gmail.com',
    pass: 'Herald12345@##',
  }
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
