const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Route to create a user
router.post('/', userController.createUser);

module.exports = router;
