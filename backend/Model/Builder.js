const mongoose = require('mongoose');

const builderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneno: {
        type: String,
        required: true,
    },
    businessname:{
        type: String,
        required: true,
    },
    cnic:{  
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '',  
    },
    role: {
        type: String,
        default: 'builder',
    },
});

const Builder = mongoose.model('Builder', builderSchema);

module.exports = Builder;
