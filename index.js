require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Check if the NODE_ENV environment variable is set to 'test'
const isTesting = process.env.NODE_ENV === 'test';

// Use a different database URL for testing
const mongoString = isTesting ? process.env.DATABASE_TEST_URL : process.env.DATABASE_URL;

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database connected');
})

const app = express();
const port = 3000;

// Import userRoutes
const userRoutes = require('./routes/userRoutes');

// Import videoRoutes
const videoRoutes = require('./routes/videoRoutes');

// Import productRoutes
const productRoutes = require('./routes/productRoutes');

// Import commentRoutes
const commentRoutes = require('./routes/commentRoutes');

// set content-type application/json
app.use(express.json());

// Use the userRoutes for '/api' path
app.use('/api', userRoutes);

// Use the videoRoutes for '/api' path
app.use('/api', videoRoutes);

// Use the productRoutes for '/api' path
app.use('/api', productRoutes);

// Use the commentRoutes for '/api' path
app.use('/api', commentRoutes);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

module.exports = app;