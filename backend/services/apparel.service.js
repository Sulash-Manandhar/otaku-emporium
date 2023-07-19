import asyncHandler from "express-async-handler";
import Apparel from "../models/apparels.model.js";
import boom from "@hapi/boom";
import mongoose from "mongoose";

const ObjectID = mongoose.Types.ObjectId;

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

export const handleDeleteProduct = asyncHandler(async (_id) => {
  if (!ObjectID.isValid(_id)) {
    throw boom.badData(messagesResponse.invalid_user_id);
  }
  const apparel = await Apparel.findById({ _id });
  if (!apparel) {
    throw boom.badData("Invalid Id");
  }
  const deletedApparel = await Apparel.findByIdAndRemove({ _id });
  if (!deletedApparel) throw boom.internal("Internal server error");
});

export const handleGetAllApparels = asyncHandler(async () => {
  const apparels = await Apparel.find().limit(15).skip(1);
  const count = await Apparel.countDocuments();
  if (!apparels) throw boom.internal();
  return { apparels, meta: { totalCount: count } };
});

export const handleApparelDetails = asyncHandler(async (_id) => {
  if (!ObjectID.isValid(_id)) {
    throw boom.badData(messagesResponse.invalid_user_id);
  }
  const apparel = await Apparel.findById({ _id });
  if (!apparel) throw boom.badData("Invalid Id");
  return apparel;
});

export const handleStatusChange = asyncHandler(async (_id, status) => {
  if (!ObjectID.isValid(_id)) {
    throw boom.badData(messagesResponse.invalid_user_id);
  }
  const apparel = await Apparel.findByIdAndUpdate({ _id }, { status });
  if (!apparel) throw boom.internal();
});
