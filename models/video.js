const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    thumbnailImageUrl: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Video', videoSchema);
