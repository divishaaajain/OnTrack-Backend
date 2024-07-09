const express = require("express");
const cors = require("cors");
const itemRouter = require("./routes/itemRouter");
const errorHandler = require("./middleware/errorHandlingMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(itemRouter);
app.use(errorHandler);

module.exports = app;