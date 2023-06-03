import { Router } from "express";
import * as Validator from "../validator/apparel.validator.js";
import * as ApparelController from "../controllers/apparel.controller.js";

const router = Router();

router.post(
  "/",
  Validator.createProductValidator,
  ApparelController.createApparel
);

router.get("/", ApparelController.getAllApparel);

router.get("/:_id", ApparelController.getApparelDetails);

router.delete("/:_id", ApparelController.deleteApparel);

router.patch(
  "/:_id",
  Validator.statusChangeValidator,
  ApparelController.changeStatus
);

export default router;
