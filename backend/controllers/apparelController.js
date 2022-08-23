const e = require("express");
const asyncHandler = require("express-async-handler");
const Apparel = require("../models/apparelModel")

const addApparel = asyncHandler(async(req, res) => {
    const { name, price, size, description, category, relatedTo } = req.body;

    const prodExist = await Apparel.findOne({ name });
    if (prodExist) {
        res.status(400);
        throw new Error("Product Name Already exists")
    }

    //adds new product to database
    const product = await Apparel.create({
        name,
        price,
        description,
        category,
        relatedTo,
        size,
    });
    if (product) {
        res.status(201).json({
            _id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            relatedTo: product.relatedTo,
            size: product.size
        });
    } else {
        res.status(500);
        throw new Error(`Server Error`)
    }
});

// delete the product prom database
const deleteApparel = asyncHandler(async(req, res) => {
    const { _id } = req.body;
    const product = await Apparel.findOne({ _id });
    if (!product) {
        res.status(400);
        throw new Error('Product Dosent Exists')
    }
    const deleteProduct = await product.remove()
    if (!deleteProduct) {
        return res
            .status(500)
            .json({ message: `Failed to delete product with id ${_id}` });
    }
    res.status(200).json({
        sucess: true,
        message: "product delete sucessfully"
    });

});


//update a certain product from database
const updateApparel = asyncHandler(async(req, res) => {
    const _id = req.params.id;

    if (Object.keys(req.body).length === 0) {
        res.status(400);
        throw new Error('No Body to Update')
    }

    const updateProduct = await Apparel.findByIdAndUpdate(_id, req.body, { new: false, });
    if (!updateProduct) {
        return res
            .status(500)
            .json({ message: `Failed to update product with id ${_id}` });
    }
    res.status(200).json({
        sucess: true,
        message: "Product updated sucessfully"
    })
});

module.exports = {
    addApparel,
    deleteApparel,
    updateApparel,
};