const mongoose = require('mongoose');
const User = require('./user');

const houseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    amenities: {
        type: [String],
        default: []
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const House = mongoose.model('House', houseSchema);

module.exports = House;