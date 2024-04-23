const axios = require('axios');
const GameModel = require('../models/game.model');
const UserModel = require('../models/user.model');
const ScoreboardModel = require('../models/score.model');

let words = [];

// Function to fetch and initialize the word list from the URL
async function initializeWordList() {
    try {
        const response = await axios.get('http://codekata.com/data/wordlist.txt');
        words = response.data.split('\n').map(word => word.trim().toLowerCase());
        console.log("Word list successfully loaded with " + words.length + " words.");
    } catch (error) {
        console.error("Failed to load word list from the URL: ", error);
    }
}

function generateRandomWord(startingLetter) {
    const filteredWords = words.filter(word => word.startsWith(startingLetter.toLowerCase()));
    return filteredWords[Math.floor(Math.random() * filteredWords.length)] || null;
}

function isValidWord(userWord, lastLetter) {
    return userWord.charAt(0).toLowerCase() === lastLetter.toLowerCase();
}

function calculateScore(wordsArray) {
    return wordsArray.length;
}

async function getLastLetter(req, res) {
    try {
        const game = await GameModel.findById(req.params.gameId);
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.status(200).json({ lastLetter: game.lastLetter });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the last letter", error: error.toString() });
    }
}

async function createGame(req, res) {
    try {
        const user = await UserModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const currentWord = generateRandomWord();
        const newGame = new GameModel({
            userId: user._id,
            userName: user.userName,
            currentWord: currentWord,
            lastLetter: currentWord.slice(-1),
            score: 0,
            isGameOver: false,
            startTime: new Date()
        });
        await newGame.save();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).json({ message: "Error creating game", error: error.toString() });
    }
}

async function playGame(req, res) {
    try {
        const game = await GameModel.findById(req.body.gameId);
        if (!game || game.isGameOver) {
            return res.status(404).json({ message: "Game not found or is already over" });
        }
        if (new Date() - game.startTime > 20000) {  // Time in milliseconds
            game.isGameOver = true;
            await game.save();
            return res.status(200).json({ message: "Time's up! Game over.", score: game.score });
        }
        if (!isValidWord(req.body.word, game.lastLetter)) {
            return res.status(400).json({ message: "Invalid word! Game over." });
        }
        game.currentWord = req.body.word;
        game.lastLetter = req.body.word.slice(-1);
        game.score += 1;
        await game.save();
        res.status(200).json({ message: "Correct! Continue playing.", game });
    } catch (error) {
        res.status(500).json({ message: "Error playing game", error: error.toString() });
    }
}

// Initialize the word list on server start
initializeWordList();

module.exports = {
    createGame,
    playGame,
    getLastLetter,
    calculateScore,
    isValidWord,
    initializeWordList // Export for testing or manual re-initialization
};
