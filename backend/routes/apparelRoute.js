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
router.delete("/", deleteApparel);
router.patch("/:id", updateApparel);

module.exports = router;