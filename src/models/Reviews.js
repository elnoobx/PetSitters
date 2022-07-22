const mongoose = require('mongoose');

const reviewsSchema = mongoose.Schema({
    pettsitterId: {
        ref: "Petsitter",
        type: mongoose.Types.ObjectId,
        require: true,
        unique: true
    },
    rating: {
        type: Number,
        require: true,
    },
    comments: {
        type: String,
        require: true,
    }
});

const Review = mongoose.model('Review', reviewsSchema);
module.exports = Review