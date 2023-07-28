// routes/commentRoutes.js

const express = require('express');
const router = express.Router();

// Import the user controller
const commentController = require('../controllers/commentController');

// Define a route to create a new user
router.post('/comments', commentController.createComment);


module.exports = router;
