const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { 
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        match: /^[a-zA-Z0-9]+$/
    },
    score: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('User', userSchema, 'users');

module.exports = UserModel;
