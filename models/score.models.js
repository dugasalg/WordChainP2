const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreboardSchema = new Schema({
    users: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        userName: { type: String, required: true }, // Translated to English
        score: { type: Number, required: true }
    }]
}, {
    timestamps: true
});

const ScoreboardModel = mongoose.model('Scoreboard', scoreboardSchema, 'scoreboards');

module.exports = ScoreboardModel;
