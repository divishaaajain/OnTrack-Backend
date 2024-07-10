const Sequelize = require('sequelize');
const { MYSQL_DATABASE, MYSQL_USERNMAE, MYSQL_PASSWORD, MYSQL_PORT } = require('./config');

const sequelize = new Sequelize(`${MYSQL_DATABASE}`, `${MYSQL_USERNMAE}`, `${MYSQL_PASSWORD}`, {
    dialect: "mysql",
    host: "localhost",
    port: `${MYSQL_PORT}`,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const connectMySQL = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL successfully.');

        await sequelize.sync();
        console.log('MySQL models synchronized successfully.');
    } catch (error) {
        console.error('Failed to connect to MySQL:', error);
        throw error;
    }
};

module.exports = {
    sequelize,
    connectMySQL,
};