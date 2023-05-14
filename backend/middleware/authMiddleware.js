// const User = require("../models/userModel");

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import logger from "../utils/Logger";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      logger.error(error);
      res.status(401);
      throw new Error("Token is expired");
    }
  }
  if (!token) {
    logger.error("Not Authorized, no token.");
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
