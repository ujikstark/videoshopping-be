// controllers/productController.js

const Product = require('../models/product');
const Video = require('../models/video');

// Function to create a new product on video
const createProduct = async (req, res) => {
    const product = new Product({
        productUrl: req.body.productUrl,
        title: req.body.title,
        price: req.body.price,
        videoId: req.body.videoId
    });

    try {
        const video = await Video.findById(req.body.videoId);
        if (!video) {
            return res.status(404).json({ message: `Video with id '${req.body.videoId}' not found` });
        }


        const productToSave = await product.save();
        res.status(201).json(productToSave);
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err.message });
    }

};



module.exports = {
    createProduct
};

