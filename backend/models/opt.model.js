import mongoose from "mongoose";

const optSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, "User Id is not defined."],
      unique: true,
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

export default mongoose.model("OPT", optSchema);
