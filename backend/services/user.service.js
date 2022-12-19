const User = require("../models/userModel");
const logger = require("../utils/Logger");
const bcrypt = require("bcryptjs");
const OPT = require("../models/optModel");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const {
  generateToken,
  generateOTP,
  throwError,
  returnResponse,
} = require("../utils/functions");

const transporter = nodemailer.createTransport({
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

const login = async (body, res) => {
  const { email, password } = body;
  const remember = body.remember || false;
  console.log(email, password, remember);
  logger.info(`User is logging In..`);

  const user = await User.findOne({ email });

  if (!user) {
    throwError(res, {
      status: 404,
      msg: `User with email '${email}' is not registered.`,
    });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throwError(res, {
      status: 400,
      msg: `Password do not match.`,
    });
  }

  if (!user.verification) {
    return returnResponse(res, {
      status: 403,
      success: false,
      msg: `User with email '${email}' is not verified.`,
      data: {
        user: { id: user.id, name: user.name, email: user.email },
      },
    });
  }

  logger.info("Generating User token");
  return returnResponse(res, {
    status: 200,
    msg: `User '${email}' is successfully logged in`,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        url: "https://bit.ly/dan-abramov",
      },
      access_token: generateToken(user.id, user.email),
      refresh_token: remember ? generateToken(user.id, user.email, true) : null,
    },
  });
};

const register = async (body, res) => {
  const { name, email, password } = body;
  logger.info("User is registering...");

  const userExists = await User.findOne({ email });

  if (userExists) {
    throwError(res, {
      status: 400,
      msg: `'${userExists.email}' is already registered.`,
    });
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
    throwError(res, {
      status: 500,
      msg: "User ${email} registrated Failed.",
    });
  }
  return returnResponse(res, {
    status: 200,
    msg: `'${user.name}' has been successfully registered.`,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });
};

const me = async (user, res) => {
  logger.info("Logged in user details...");
  const { _id, name, email } = await User.findById(user.id);
  logger.info("Logged in user details sent..");

  return returnResponse(res, {
    status: 200,
    msg: `User is logged in`,
    data: {
      user: {
        id: _id,
        name: name,
        email: email,
        url: "https://bit.ly/dan-abramov",
      },
    },
  });
};

const generateRefreshToken = async (req, res) => {
  const { user } = req;
  const { _id, name, email } = await findById(user.id);

  returnResponse(res, {
    status: 200,
    msg: "Access Token updated",
    data: {
      user: { id: _id, name: name, email: email },
      access_token: generateToken(_id, email),
      refresh_token: generateToken(_id, email, true),
    },
  });
};

const sendEmail = async (email, res) => {
  //validate user
  const user = await User.findOne({ email });
  if (!user) {
    throwError(res, {
      status: 400,
      msg: `User with '${email}' is not registered.`,
    });
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
  logger.info("Sending email...");

  //sends mail to the defined email address
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throwError(res, {
        status: 400,
        msg: error.response,
      });
    }
    logger.info(info);

    return returnResponse(res, {
      status: 200,
      msg: `The email has been sent to ${email}`,
    });
  });
};

const OPTverification = async (body, res) => {
  const { user_id, code } = body;

  //is user registered
  const user = await User.findById(user_id);

  if (!user) {
    throwError(res, {
      status: 400,
      msg: `User is not registered.`,
    });
  }
  //if user is already verified
  if (user.verification) {
    return returnResponse(res, {
      status: 200,
      msg: `User ${user.name} is already verified.`,
    });
  }

  //verification email sent to the user?
  const optUser = await OPT.findOne({ user_id });
  if (!optUser) {
    throwError(res, {
      status: 400,
      msg: `Verification email is yet to be sent to the user.`,
    });
  }

  if (code !== optUser.opt_code) {
    throwError(res, {
      status: 400,
      msg: `Invalid verification code.`,
    });
  }

  //updating user verification code.
  const updateUser = await User.findByIdAndUpdate(
    user_id,
    { verification: true },
    { new: false }
  );
  if (!updateUser) {
    throwError(res, {
      status: 500,
      msg: `Error while updating user verification status.`,
    });
  }
  await optUser.remove();

  logger.info("User verification status updated successfully.");
  return returnResponse(res, {
    status: 200,
    msg: `User verification status updated successfully.`,
  });
};

module.exports = {
  login,
  register,
  me,
  generateRefreshToken,
  sendEmail,
  OPTverification,
};
