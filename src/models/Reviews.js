const mongoose = require('mongoose');

const reviewsSchema = mongoose.Schema({
    PettsitterId:{
        type: Number,
        require:true,
        unique: true
    },
    rating:{
        type:Number,
        require:true,
    },
    comments:{
        type:String,
        require:true,
    }
});

module.exports = mongoose.model('Reviews',reviewsSchema);