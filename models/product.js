const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productUrl: {
        required: true,
        type: String
    },
    title: { required: true, type: String },
    price: { require: true, type: Number },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Video'
    }
});


module.exports = mongoose.model('Product', productSchema);

