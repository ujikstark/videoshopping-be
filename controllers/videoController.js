// controllers/userController.js

const Video = require('../models/video');
const Product = require('../models/product');;
const Comment = require('../models/comment');

// Function to create a new video
const createVideo = async (req, res) => {
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
};

// Function to get all videos
const getVideos =  async (req, res) => {

    try {
        const videos = await Video.find();

        if (videos.length === 0) {
            return res.status(404).json({ message: 'videos not found' });
        }
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving videos', error: err.message });
    }
};

// Function to get video details by id
const getVideoById = async (req, res) => {
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
};

// Function to get products by videoId
const getProductsByVideoId =  async (req, res) => {
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
};

// Function to get comments by videoId
const getCommentsByVideoId =  async (req, res) => {
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
};

module.exports = {
    createVideo,
    getVideos,
    getVideoById,
    getProductsByVideoId,
    getCommentsByVideoId
};
