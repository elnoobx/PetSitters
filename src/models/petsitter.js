const mongoose = require('mongoose');

const PetsitterSchema = mongoose.Schema({
    cityId: {
        ref: "City",
        type: mongoose.Types.ObjectId,
        require: true
    },
    name: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    cellphone: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    photoURL: {
        type: String,
        require: true,
    }
}, { timestamps: true });

const Petsitter = mongoose.model('Petsitter', PetsitterSchema);
module.exports = Petsitter