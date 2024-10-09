const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 4,
        maxLength: 50,
        required: true,
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 50,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        required: true,
    },
    password: {
        type: String,
        match: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
        required: true,
    },
    age: {
        type: Number,
        min: 12,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    skills:{
        type:[],
        
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
