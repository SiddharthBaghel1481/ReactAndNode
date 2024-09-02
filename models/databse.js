const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true  
    },
    contact: {
        type: String,
        unique: true,
        //   required:true
    },
    bio: {
        type: String,
        //  required:true,
    },
    image: {
        type: String,
        default: ''
    },
    friends: {
        type: [String],
    }
}, { timestamps: true })

const User = new mongoose.model('user', userSchema);
module.exports = User;