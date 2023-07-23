const express = require('express');
const router = express.Router();
const Video = require('../models/video');
const Product = require('../models/product');
const Comment = require('../models/comment');
const User = require('../models/user');


// Route: POST /users (Create a new user)
router.post('/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        photoUrl: req.body.photoUrl
    });

    try {
        const userToSave = await user.save();
        res.status(201).json(userToSave);
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
});


// Route: GET /users (Get all users)
router.get('/users', async (req, res) => {

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route: GET /users/:id (Get user detail by id)
router.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error(`User with id '${id}' not found`);
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route: POST /videos (Create a new video)
router.post('/videos', async (req, res) => {
    const video = new Video({
        title: req.body.title,
        userId: req.body.userId,
        thumbnailImageUrl: req.body.thumbnailImageUrl,
        products: req.body.products,
    });

    try {
        const videoToSave = await video.save();
        res.status(201).json(videoToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route: GET /videos (Get all videos)
router.get('/videos', async (req, res) => {

    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route: GET /videos/:id (Get video details with products and comments)
router.get('/videos/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const video = await Video.findById(id);
        if (!video) {
            throw new Error(`Video with id '${id}' not found`);
        }

        const products = await Product.find({ videoId: id });
        const comments = await Comment.find({ videoId: id });

        const videoDetail = {
            _id: video.id,
            title: video.title,
            thumbnailImageUrl: video.thumbnailImageUrl,
            products: products,
            comments: comments
        }

        res.status(200).json(videoDetail);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route: POST /products (Create a new product)
router.post('/products', async (req, res) => {
    const product = new Product({
        productUrl: req.body.productUrl,
        title: req.body.title,
        price: req.body.price,
        videoId: req.body.videoId
    });

    try {
        const productToSave = await product.save();
        res.status(201).json(productToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

// Route: POST /comments (Create a new comment)
router.post('/comments', async (req, res) => {
    const comment = new Comment({
        username: req.body.username,
        comment: req.body.comment,
        videoId: req.body.videoId
    });

    try {
        const commentToSave = await comment.save();
        res.status(201).json(commentToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;