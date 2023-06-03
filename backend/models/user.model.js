import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  city: {
    type: String,
    required: "City is missing in address",
  },
  state: {
    type: String,
    required: "Street is missing in address.",
  },
  zip_code: {
    type: Number,
    required: "Zip code is missing in address",
  },
});

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is missing"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      default: "others",
    },
    contact: {
      type: Number,
      required: "Contact number is missing",
    },

    address: addressSchema,
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    verification: {
      type: Boolean,
      default: false,
    },
    ban: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
