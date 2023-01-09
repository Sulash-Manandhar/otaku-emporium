const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  handleAddApparel,
  handleDeleteApparel,
  handleUpdataApparel,
  handleGetApparels,
  handleGetApparel,
} = require("../controllers/apparelController");

router.get("/:id", handleGetApparel);
router.get("/", handleGetApparels);
router.post("/", protect, handleAddApparel);
router.delete("/:id", protect, handleDeleteApparel);
router.put("/:id", protect, handleUpdataApparel);

module.exports = router;
