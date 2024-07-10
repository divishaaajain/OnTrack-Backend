require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_CLUSTER_URI: process.env.MONGODB_CLUSTER_URI,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    MONGODB_USER: process.env.MONGODB_USER,
    MONGODB_APP_NAME: process.env.MONGODB_APP_NAME,
    MONGODB_DBNAME: process.env.MONGODB_DBNAME,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_USERNMAE: process.env.MYSQL_USERNMAE,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_PORT: process.env.MYSQL_PORT
};