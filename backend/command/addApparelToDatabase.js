import Apparel from "../models/apparels.model.js";
import { apparelData } from "../data/apparelData.js";
import logger from "../utils/Logger.js";

export async function addApparelToDocument() {
  const count = await Apparel.countDocuments({});
  if (count > 0) {
    return;
  }
  logger.warn("Apparel Databases is empty.");
  logger.info("Adding apparels to database");
  const user = await Apparel.insertMany(apparelData);
  if (!user) {
    logger.error("Failed to add apparel data in database");
  }
  logger.info("Successfully added apparel data to database.");
}
