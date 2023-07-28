// routes/videoRoutes.js

const express = require('express');
const router = express.Router();

// Import the user controller
const videoController = require('../controllers/videoController');

// Define a route to get all videos
router.get('/videos', videoController.getVideos);

// Define a route to get a video by ID
router.get('/videos/:id', videoController.getVideoById);

// Define a route to create a new video
router.post('/videos', videoController.createVideo);

// Define a route to get products by video ID
router.get('/videos/:videoId/products', videoController.getProductsByVideoId);

// Define a route to get comments by video ID
router.get('/videos/:videoId/comments', videoController.getCommentsByVideoId);


module.exports = router;
