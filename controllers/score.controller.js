const ScoreboardModel = require('../models/score.models');
const UserModel = require('../models/user.models');

async function createScoreboard(req, res) {
    try {
        const existingScoreboard = await ScoreboardModel.findOne();
        if (existingScoreboard) {
            return res.status(400).json({ message: "A scoreboard already exists." });
        }
        const newScoreboard = new ScoreboardModel({ users: [] });
        await newScoreboard.save();
        res.status(201).json(newScoreboard);
    } catch (error) {
        res.status(500).json({ message: "Error creating scoreboard", error: error.toString() });
    }
}

async function addUserToScoreboard(req, res) {
    try {
        const user = await UserModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const scoreboard = await ScoreboardModel.findOne();
        if (!scoreboard) {
            return res.status(404).json({ message: "Scoreboard not found" });
        }
        let userEntry = scoreboard.users.find(u => u.userId.equals(req.body.userId));
        if (userEntry) {
            userEntry.score = req.body.score || userEntry.score;
        } else {
            scoreboard.users.push({ userId: user._id, userName: user.userName, score: req.body.score || 0 });
        }
        await scoreboard.save();
        res.status(200).json(scoreboard);
    } catch (error) {
        res.status(500).json({ message: "Error adding user to scoreboard", error: error.toString() });
    }
}

async function getTopPlayers(req, res) {
    try {
        const scoreboard = await ScoreboardModel.findOne().populate({
            path: 'users.userId',
            select: 'userName score'  // Asegúrate de que los campos son correctos según tu modelo de Usuario
        });
        if (!scoreboard) {
            return res.status(404).json({ message: "Scoreboard not found" });
        }
        res.status(200).json(scoreboard.users.slice(0, 10));
    } catch (error) {
        res.status(500).json({ message: "Error retrieving top players", error: error.toString() });
    }
}

module.exports = {
    createScoreboard,
    addUserToScoreboard,
    getTopPlayers
};
