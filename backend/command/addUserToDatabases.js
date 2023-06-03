import User from "../models/user.model.js";
import { userData } from "../data/uesrData.js";
import logger from "../utils/Logger.js";

export async function addUserToDocument() {
  const count = await User.countDocuments({});
  if (count > 0) {
    return;
  }
  logger.warn("User Databases is empty.");
  logger.info("Adding data to database");
  const user = await User.insertMany(userData);
  if (!user) {
    logger.error("Failed to add user data in database");
  }
  logger.info("Successfully added user data to database.");
}
