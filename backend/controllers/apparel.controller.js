import HttpStatus from "http-status-codes";
import asyncHandler from "express-async-handler";
import * as ApparelService from "../services/apparel.service.js";

export const createApparel = asyncHandler(async (req, res, next) => {
  ApparelService.handleCreateProduct(req.body)
    .then((data) =>
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Product successfully created",
        data,
      })
    )
    .catch((err) => next(err));
});

export const deleteApparel = asyncHandler(async (req, res, next) => {
  ApparelService.handleDeleteProduct(req.params._id)
    .then(() =>
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Product successfully deleted",
      })
    )
    .catch((err) => next(err));
});
