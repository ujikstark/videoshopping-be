const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    photoUrl: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
