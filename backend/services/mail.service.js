import nodemailer from "nodemailer";
import OPT from "../models/opt.model.js";
import { generateOPT } from "../utils/generateOPT.js";
import hbs from "nodemailer-express-handlebars";
import asyncHandler from "express-async-handler";
import boom from "@hapi/boom";
import User from "../models/user.model.js";
import { messagesResponse } from "../constant/errorMessages.js";
import { GMAIL, SERVER_ERROR } from "../constant/common.js";
import logger from "../utils/Logger.js";

const transporter = nodemailer.createTransport({
  service: GMAIL,
  auth: {
    user: "official.otakuemporium@gmail.com",
    pass: "ggnumciqtlntdoyh",
  },
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
});

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

export const sendUserVerificationCode = asyncHandler(async (body) => {
  const email = body.email;
  const user = await User.findOne({ email });
  if (!user) {
    logger.error(messagesResponse.user_not_register);
    throw boom.notFound(messagesResponse.user_not_register);
  }

  const alreadySent = await OPT.findOne({ user_id: user.id });
  if (alreadySent) {
    await OPT.findByIdAndDelete(alreadySent._id);
  }

  const code = await OPT.create({
    user_id: user.id,
    opt_code: generateOPT(),
  });

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Otaku Emporium - Verify Your Email Address",
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

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      throw boom.internal(
        JSON.stringify({
          message: messagesResponse.internal_server_error,
          param: "error",
          type: SERVER_ERROR,
        })
      );
    } else {
      return {
        msg: `The verification code has been seen to '${email}' email address`,
      };
    }
  });
});
