// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const songsRoutes = require('./routes/router');

const app = express();
const PORT = process.env.PORT || 1111;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.use('/', songsRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
