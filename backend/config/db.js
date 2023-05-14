import mongoose from "mongoose";
import logger from "../utils/Logger.js";

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => logger.info("MongoDB connected..."))
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });
};

export default connectDB;
