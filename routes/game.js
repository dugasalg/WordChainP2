const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');

// Route to create a new game
router.post('/new-game', gameController.createGame);

// Route to process a move in an existing game
router.post('/play', gameController.playGame);

// Route to get the last letter of the current word in a game
router.get('/get/:gameId', gameController.getLastLetter);

module.exports = router;
