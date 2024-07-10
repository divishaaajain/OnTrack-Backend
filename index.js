const http = require("http");
const app = require("./app"); // express app
const { PORT } = require("./config/config");
const { mongoDBClient } = require("./config/mongoDbDatabase");
const { connectMySQL } = require("./config/mysqlDatabase");

// Function to start the server
const startServer = () => {
    const server = http.createServer(app);
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

const connectMongoDB = async () => {
    try {
        await mongoDBClient.initiateDb();
        console.log('Connected to MongoDB successfully.');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
};

// Connect to both MongoDB and MySQL, then start the server
const connectDatabasesAndStartServer = async () => {
    try {
        await Promise.all([connectMongoDB(), connectMySQL()]);
        startServer();
    } catch (error) {
        console.error('Failed to start server due to database connection error:', error);
        process.exit(1);
    }
};

connectDatabasesAndStartServer();