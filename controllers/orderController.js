const Order = require("../models/ordersModel");
const OrderItem = require("../models/order-itemModel");
const responseMessages = require("../constants/responseMessages");
const CustomError = require("../utils/customErrorUtil");
const { ObjectId } = require("mongodb");
const { mongoDBClient } = require("../config/mongoDbDatabase");
const collections = require("../constants/collectionNames");

// on successful payment - suppose payment is completed
const addOrder = async ({ orderDetails, user_id }) => {
    if (!user_id) {
        throw new CustomError("User id not found", 404);
    }

    try {
        // Create Order
        const order = await Order.create({
            userId: user_id,
            amount: orderDetails.amount
        });

        // Create OrderItems associated with the Order
        await Promise.all(orderDetails.items.map(async (item) => {
            await OrderItem.create({
                pricePerUnit: item.price,
                quantity: item.quantity,
                itemId: item.itemId,
                orderId: order.id
            });
        }));

        return responseMessages.order.add;
    } catch (error) {
        throw error;
    }
};

const getOrders = async ({ user_id }) => {
    const storageDb = mongoDBClient.db;

    try {
        // Fetch orders from MySQL
        const orders = await Order.findAll({
            where: { userId: user_id },
            include: [{
                model: OrderItem,
                required: true // only orders with associated items will be fetched
            }]
        });

        if (orders.length === 0) {
            return null;
        }

        // Extract itemIds from OrderItems
        const itemIds = orders.flatMap(order => order.OrderItems.map(item => item.itemId));

        // Fetch item details from MongoDB
        const items = await storageDb
            .collection(collections.items)
            .find({ _id: { $in: itemIds.map(id => new ObjectId(id)) } })
            .toArray();

        if (items.length === 0) {
            throw new Error("No items found", 404)
        }

        // Map item details back into orders
        const ordersWithItems = orders.map(order => ({
            id: order.id,
            userId: order.userId,
            amount: order.amount,
            items: order.OrderItems.map(orderItem => {
                const itemDetail = items.find(item => item._id.toString() === orderItem.itemId);
                return {
                    itemId: orderItem.itemId,
                    quantity: orderItem.quantity,
                    pricePerUnit: orderItem.pricePerUnit,
                    itemName: itemDetail.name,
                };
            })
        }));

        return ordersWithItems;
    } catch (error) {
        throw error;
    }
};

const getOrder = async ({ user_id, orderId }) => {
    const storageDb = mongoDBClient.db;

    try {
        // Fetch the specific order from MySQL
        const order = await Order.findOne({
            where: {
                userId: user_id,
                id: orderId
            },
            include: [{
                model: OrderItem,
                required: true
            }]
        });

        if (!order) {
            return null;
        }

        const itemIds = order.OrderItems.map(item => item.itemId);

        const items = await storageDb
            .collection(collections.items)
            .find({ _id: { $in: itemIds.map(id => new ObjectId(id)) } })
            .toArray();

        if (items.length === 0) {
            throw new Error("No items found", 404)
        }

        // Map item details back into the order
        const orderWithItems = {
            id: order.id,
            userId: order.userId,
            amount: order.amount,
            items: order.OrderItems.map(orderItem => {
                const itemDetail = items.find(item => item._id.toString() === orderItem.itemId);
                return {
                    itemId: orderItem.itemId,
                    quantity: orderItem.quantity,
                    pricePerUnit: orderItem.pricePerUnit,
                    itemName: itemDetail.name,
                };
            })
        };

        return orderWithItems;
    } catch (error) {
        throw error;
    }
};

const deleteOrder = async ({ user_id, orderId }) => {
    try {
        const order = await Order.findOne({
            where: {
                userId: user_id,
                id: orderId
            }
        });

        if (!order) {
            throw new CustomError('Order not found', 404);
        }

        await order.destroy();

        return responseMessages.order.delete;
    } catch (error) {
        throw error;
    }
};

module.exports = { addOrder, getOrders, getOrder, deleteOrder };