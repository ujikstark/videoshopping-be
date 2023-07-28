// controllers/productController.js

const Product = require('../models/product');

// Function to create a new product on video
const createProduct = async (req, res) => {
    const product = new Product({
        productUrl: req.body.productUrl,
        title: req.body.title,
        price: req.body.price,
        videoId: req.body.videoId
    });

    try {
        const productToSave = await product.save();
        res.status(201).json(productToSave);
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err.message });
    }

};



module.exports = {
    createProduct
};

