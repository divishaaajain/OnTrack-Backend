const express = require('express');
const cors = require('cors');
const itemRouter = require('./routes/itemRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(itemRouter);

module.exports = app;