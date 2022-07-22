const mongoose = require('mongoose');

const cityShema = mongoose.Schema({
    state: {
        ref: "State",
        type: mongoose.Types.ObjectId,
        require: true
    },
    name: {
        type: String,
        require: true,
    },
}, {
    timestamps: true
});

const City = mongoose.model('City', cityShema);
module.exports = City