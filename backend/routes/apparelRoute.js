const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { findOneAndReplace } = require("../models/apparelModel");
const {
  addApparel,
  editApparel,
  updateApparel,
} = require("../controllers/apparelController");

router.post("/", addApparel);
