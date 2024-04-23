const express = require('express');
const router = express.Router();

const { createUser } = require('../controllers/user.controller'); // Ensure the function names match those exported by the user controller

// Route to create a user
router.post('/', createUser);

module.exports = router;
