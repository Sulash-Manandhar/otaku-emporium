const mongoose = require("mongoose");
const optSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, "User Id is not defined."],
    },
    opt_code: {
      type: String,
      required: [true, "Verification (OPT) code is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OPT", optSchema);
