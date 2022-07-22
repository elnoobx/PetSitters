const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    }
}, { timestamps: true });

const State = mongoose.model('State', stateSchema);
module.exports = State