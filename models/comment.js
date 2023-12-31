const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    comment: {
        required: true,
        type: String,
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Video'
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
