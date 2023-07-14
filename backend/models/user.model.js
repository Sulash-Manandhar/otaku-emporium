import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  country: {
    type: String,
    required: "Country is missing in address",
  },
  city: {
    type: String,
    required: "City is missing in address",
  },
  street_name: {
    type: String,
    required: "Street name is missing in address.",
  },
  street_number: {
    type: String,
    required: "Street number is missing in address.",
  },
  postal_code: {
    type: String,
    required: "Postal code is missing in address",
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
      enum: ["male", "female", "other"],
      default: "others",
    },
    contact: {
      type: String,
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
