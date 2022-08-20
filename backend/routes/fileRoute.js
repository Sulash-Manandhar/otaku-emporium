const express = require("express");
const { uploadFile } = require("../controllers/fileController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/upload", protect, uploadFile);

module.exports = router;
