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


// Route: GET /users (Retrieve all users)
router.get('/users', async (req, res) => {

    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: 'Users not found' });
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users', error: err.message });
    }
});

// Route: GET /users/:id (Retrieve user detail by id)
router.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: `User with id '${id}' not found` });
        }
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user', error: err.message });
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
    } catch (err) {
        res.status(500).json({ message: 'Error creating video', error: err.message });
    }
});

// Route: GET /videos (Get all videos)
router.get('/videos', async (req, res) => {

    try {
        const videos = await Video.find();

        if (videos.length === 0) {
            return res.status(404).json({ message: 'videos not found' });
        }
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving videos', error: err.message });
    }
});

// Route: GET /videos/:id (Retrieve video details by id)
router.get('/videos/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: `Video with id '${id}' not found` });
        }

        res.status(200).json(video);

    } catch (err) {
        res.status(500).json({ message: 'Error retrieving video', error: err.message });
    }
});

// Route: GET /videos/:videoId/products (Retrieve products by videoId)
router.get('/videos/:videoId/products', async (req, res) => {
    const videoId = req.params.videoId;
    try {
        const products = await Product.find({ videoId: videoId });
        if (products.length === 0) {
            return res.status(404).json({ message: 'Products not found for this video' });
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving products', error: err.message });
    }
});

// Route: GET /videos/:videoId/comments (Retrieve comments by videoId)
router.get('/videos/:videoId/comments', async (req, res) => {
    const videoId = req.params.videoId;
    try {
        const comments = await Comment.find({ videoId: videoId });
        if (comments.length === 0) {
            return res.status(404).json({ message: 'Comments not found for this video' });
        }
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving commments', error: err.message });
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
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err.message });
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
        res.status(500).json({ message: 'Error creating comments', error: err.message });
    }
})

module.exports = router;