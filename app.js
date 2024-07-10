const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const itemsRouter = require("./routes/itemsRouter");
const errorHandler = require("./middleware/errorHandlingMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(authRouter);
app.use(itemsRouter);
app.use(errorHandler);

module.exports = app;