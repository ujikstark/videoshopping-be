const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    thumbnailImageUrl: {
        required: true,
        type: String
    },
    videoUrl: {
        required: true,
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Video', videoSchema);
