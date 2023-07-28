// routes/productRoutes.js

const express = require('express');
const router = express.Router();

// Import the user controller
const productController = require('../controllers/productController');

// Define a route to create a new user
router.post('/products', productController.createProduct);


module.exports = router;
