// controllers/commentController.js

const Comment = require('../models/comment');
const Video = require('../models/video');

// Function to create a new comment on video
const createComment =  async (req, res) => {
    const comment = new Comment({
        username: req.body.username,
        comment: req.body.comment,
        videoId: req.body.videoId
    });

    try {

        const video = await Video.findById(req.body.videoId);
        if (!video) {
            return res.status(404).json({ message: `Video with id '${req.body.videoId}' not found` });
        }

        const commentToSave = await comment.save();
        res.status(201).json(commentToSave);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comments', error: err.message });
    }
};


module.exports = {
    createComment
};

