const mongoose = require("mongoose");

const sizeModel = mongoose.Schema({
    small: {
        type: Number,
        default: 0,
    },
    medium: {
        type: Number,
        default: 0,
    },
    large: {
        type: Number,
        default: 0,
    },
});

const apparelModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name of the product is required."],
    },
    price: {
        type: Number,
        required: [true, "Price of the product is required."],
        min: 500,
    },
    size: {
        type: sizeModel,
        required: [true, "Available size of product is required"],
    },
    category: {
        type: String,
        enum: ["Hoodie", "Sweetshirt", "T-shirt"],
        required: [true, "Category of the product is required."],
    },
    description: {
        type: String,
        required: [true, "must have description"]
    },
    relatedTo: {
        type: String,
        required: [true, "which anime the product  belongs to"]
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Apparel", apparelModel);