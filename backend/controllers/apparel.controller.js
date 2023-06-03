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

export const getAllApparel = asyncHandler(async (req, res, next) => {
  ApparelService.handleGetAllApparels()
    .then((data) =>
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Successfully fetched all data",
        data,
      })
    )
    .catch((err) => next(err));
});

export const getApparelDetails = asyncHandler(async (req, res, next) => {
  ApparelService.handleApparelDetails(req.params._id)
    .then((data) =>
      res.status(HttpStatus.OK).json({
        message: "Successfully fetched apparel details",
        success: true,
        data,
      })
    )
    .catch((err) => next(err));
});

export const changeStatus = asyncHandler(async (req, res, next) => {
  ApparelService.handleStatusChange(req.params._id, req.body.status)
    .then(() =>
      res
        .status(HttpStatus.OK)
        .json({ message: "Successfully changed the status of a product" })
    )
    .catch((err) => next(err));
});
