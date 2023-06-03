import mongoose from "mongoose";

const sizeModel = mongoose.Schema({
  small: {
    type: Number,
    default: null,
  },
  medium: {
    type: Number,
    default: null,
  },
  large: {
    type: Number,
    default: null,
  },
});

const imageModel = mongoose.Schema({
  name: { type: String, required: [true, "Image name is missing"] },
  path: { type: String, required: [true, "Image path is missing"] },
});

const apparelModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the product is required."],
    },
    price: {
      type: Number,
      required: [true, "Price of the product is required."],
      min: 500,
    },
    color: {
      type: String,
      required: [true, "Base color of product is required"],
    },
    size: {
      type: sizeModel,
      required: [true, "Available size of product is required"],
    },
    category: {
      type: String,
      enum: ["hoodie", "sweetshirt", "t-shirt"],
      required: [true, "Category of the product is required."],
    },
    description: {
      type: String,
      required: [true, "must have description"],
    },
    keyword: {
      type: [String],
      required: [true, "which anime the product  belongs to"],
    },
    image: {
      type: [imageModel],
      required: [true, "Atleast one image of the product is required."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Apparel", apparelModel);
