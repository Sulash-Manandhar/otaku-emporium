const asyncHandler = require("express-async-handler");
const { findByIdAndRemove } = require("../models/apparelModel");
const Apparel = require("../models/apparelModel");
const { throwError, returnResponse } = require("../utils/functions");
const logger = require("../utils/Logger");

const getApparels = asyncHandler(async (res) => {
  const apparels = await Apparel.find();
  if (!apparels) {
    throwError(res, {
      status: 502,
      msg: "Failed to fetch all products",
    });
  }
  return returnResponse(res, {
    status: 200,
    msg: "All product successfully fetched.",
    data: apparels,
  });
});

const getApparel = asyncHandler(async (id, res) => {
  const apparel = await Apparel.findById(id);
  if (!apparel) {
    throwError(res, {
      status: 502,
      msg: "product not found.",
    });
  }
  return returnResponse(res, {
    status: 200,
    msg: "product found successfully.",
    data: apparel,
  });
});

const addApparel = asyncHandler(async (body, res) => {
  const { name, price, size, description, category, relatedTo } = body;

  const product = await Apparel.create({
    name,
    price,
    description,
    category,
    relatedTo,
    size,
  });
  if (!product) {
    throwError(res, {
      status: 500,
      msg: "Error while adding product to database",
    });
  }
  logger.info("Product Added to the database");
  return returnResponse(res, {
    status: 200,
    msg: `Successfully added product to the database.`,
  });
});

const deleteApparel = asyncHandler(async (id, res) => {
  const product = await Apparel.findById(id);
  if (!product) {
    throwError(res, {
      status: 404,
      msg: "Product does not exists.",
    });
  }
  await findByIdAndRemove(id);
  return returnResponse(res, {
    status: 200,
    msg: "Product successfully deleted",
  });
});

const updatedApparel = asyncHandler(async (id, body, res) => {
  const updatedProduct = await Apparel.findByIdAndUpdate(id, body, {
    new: false,
  });
  if (!updatedProduct) {
    throwError(res, {
      status: 404,
      msg: "Product not found.",
    });
    return returnResponse(res, {
      status: 200,
      msg: "Product updated successfully",
    });
  }
});

module.exports = {
  getApparel,
  getApparels,
  addApparel,
  deleteApparel,
  updatedApparel,
};
