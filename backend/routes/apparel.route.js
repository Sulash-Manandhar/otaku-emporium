import { Router } from "express";
import * as Validator from "../validator/apparel.validator.js";
import * as ApparelController from "../controllers/apparel.controller.js";

const router = Router();

router.post(
  "/",
  Validator.createProductValidator,
  ApparelController.createApparel
);

export default router;
