require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

let mongoString = process.env.DATABASE_URL;
let port = 3000;


// Check if the NODE_ENV environment variable is set to 'test'
switch (process.env.NODE_ENV) {
    case 'test':
        mongoString = process.env.DATABASE_TEST_URL;
        break;
    case 'production':
        port = 3000;
        mongoString = process.env.DATABASE_PROD_URL;
        break;
}


console.log(mongoString);
mongoose.connect(mongoString);


const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database connected');
})

const app = express();

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
app.use('/videos', (req, res) => {
    res.send({tes: "halo"});
})

// Use the userRoutes for '/v1' path
app.use('/v1', userRoutes);

// Use the videoRoutes for '/v1' path
app.use('/v1', videoRoutes);

// Use the productRoutes for '/v1' path
app.use('/v1', productRoutes);

// Use the commentRoutes for '/v1' path
app.use('/v1', commentRoutes);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

module.exports = app;