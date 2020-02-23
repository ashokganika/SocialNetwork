var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique:true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others'],
        required:true
    },
    dob: {
        type : Date,
    },
    phone: {
        type: Number
    },
    role: {
        type: Number,
        default: 2
    },
    address: {
        type: String
    }
}, {
    timestamps:true
});

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;