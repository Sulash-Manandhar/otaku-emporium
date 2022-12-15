const mongoose = require("mongoose");
const logger = require("../utils/Logger");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("MongoDB connected...");
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
