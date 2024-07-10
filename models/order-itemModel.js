const Sequelize = require('sequelize');
const { sequelize } = require("../config/mysqlDatabase");

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    itemId: {
        type: Sequelize.STRING, // mongoDb _id
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pricePerUnit: {
        type: Sequelize.FLOAT, // per quantity at the time of purchase
        allowNull: false
    }
});

module.exports = OrderItem;
