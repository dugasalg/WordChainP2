const express = require('express');
const router = express.Router();

const scoreboardController = require('../controllers/scoreboard.controller'); // Ensure this matches the actual filename

// Route to create a new scoreboard
router.post('/new-scoreboard', scoreboardController.createScoreboard);

// Route to add a user to the scoreboard
router.post('/add-user', scoreboardController.addUserToScoreboard);

// Route to get the top players from the scoreboard
router.get('/get-top-players', scoreboardController.getTopPlayers);

module.exports = router;
