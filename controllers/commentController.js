// controllers/commentController.js

const Comment = require('../models/comment');

// Function to create a new comment on video
const createComment =  async (req, res) => {
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
};


module.exports = {
    createComment
};

