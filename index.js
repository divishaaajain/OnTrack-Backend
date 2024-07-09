const http = require("http");
const app = require("./app"); // express app
const { PORT } = require("./config/config");
const { mongoDBClient } = require("./config/database");

// Function to start the server
const startServer = () => {
    const server = http.createServer(app);
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

// Connect to MongoDB and start the server
mongoDBClient.initiateDb()
    .then(() => {
        console.log('Database connection successful');
        startServer();
    })
    .catch((error) => {
        console.error('Failed to start server due to database connection error:', error);
        process.exit(1); // Exit process with failure
    });