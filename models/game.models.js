const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    userName: {  
        type: String,
        required: true
    },
    currentWord: {
        type: String,
        required: true,
        match: /^[A-Za-z\u00C0-\u00FF]+$/  // Includes accented characters
    },
    usedWords: [String], 
    score: {
        type: Number,
        default: 0
    },
    isGameOver: {
        type: Boolean,
        default: false
    },
    lastLetter: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const GameModel = mongoose.model('Game', gameSchema, 'games');

module.exports = GameModel;
