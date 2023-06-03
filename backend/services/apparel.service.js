import asyncHandler from "express-async-handler";
import logger from "../utils/Logger.js";
import Apparel from "../models/apparels.model.js";
import boom from "@hapi/boom";

export const handleCreateProduct = asyncHandler(async (body) => {
  const { size, ...rest } = body;
  const totalNumberOfProduct = Object.values(size).reduce(
    (total, current) => total + current,
    0
  );
  if (totalNumberOfProduct < 5) {
    throw boom.notAcceptable("Number of product is less than 5");
  }

  const product = await Apparel.create(body);
  if (!product) throw boom.internal("Something went wrong");
  return product;
});
