const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { findOneAndReplace } = require("../models/apparelModel");
const {
  addApparel,
  deleteApparel,
  updateApparel,
} = require("../controllers/apparelController");
const { model } = require("mongoose");

router.post("/", addApparel);
router.delete("/:id", protect, deleteApparel);
router.patch("/:id", protect, updateApparel);

module.exports = router;
