const UserModel = require('../models/user.models');

async function createUser(req, res) {
    try {
        const newUser = new UserModel({
            userName: req.body.userName,
            score: req.body.score || 0
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Invalid characters, only letters", error: error.toString() });
    }
}

module.exports = {
    createUser
};
