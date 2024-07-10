const { mongoDBClient } = require("../config/database");
const CustomError = require("../utils/customErrorUtil");
const { ObjectId } = require('mongodb');

const addItem = async ({ itemDetails, user_id }) => {
    const storageDB = mongoDBClient.db;

    const item = {
        user_id: user_id,
        name: itemDetails.name,
        description: itemDetails.description,
        price: itemDetails.price,
        quantity: itemDetails.quantity
    };

    try {
        await storageDB
            .collection('items')
            .insertOne(item);
    } catch (error) {
        throw error;
    }

    return "Item added successfully";
};

const getItems = async () => {
    const storageDB = mongoDBClient.db;

    let items;
    try {
        items = await storageDB
            .collection('items')
            .find()
            .toArray();
    } catch (error) {
        throw error;
    }

    if (items.length === 0) {
        throw new CustomError("Items not found", 404);
    }

    return items;
};

const getItem = async ({ item_id }) => {
    const storageDB = mongoDBClient.db;

    let item;
    try {
        item = await storageDB
            .collection('items')
            .findOne({ _id: new ObjectId(item_id) });
    } catch (error) {
        throw error;
    }

    if (!item) {
        throw new CustomError("Item not found", 404);
    }

    return item;
};

const updateItem = async ({ user_id, item_id, updatedDetails }) => {
    const storageDB = mongoDBClient.db;

    let item;
    try {
        item = await storageDB
            .collection('items')
            .findOne({ _id: new ObjectId(item_id) });
    } catch (error) {
        throw error;
    }

    if (!item) {
        throw new CustomError("Item not found", 404);
    }

    if (item.user_id.toString() !== user_id) {
        throw new CustomError("Unauthorized", 401);
    }

    try {
        await storageDB
            .collection('items')
            .updateOne(
                { _id: new ObjectId(item_id) },
                { $set: updatedDetails }
            );
    } catch (error) {
        throw error;
    }

    return "Item updated successfully";
};

const deleteItem = async ({ user_id, item_id }) => {
    const storageDB = mongoDBClient.db;

    let item;
    try {
        item = await storageDB
            .collection('items')
            .findOne({ _id: new ObjectId(item_id) });
    } catch (error) {
        throw error;
    }

    if (!item) {
        throw new CustomError("Item not found", 404);
    }

    if (item.user_id.toString() !== user_id) {
        throw new CustomError("Unauthorized", 401);
    }

    try {
        await storageDB
            .collection('items')
            .deleteOne({ _id: new ObjectId(item_id) });
    } catch (error) {
        throw error;
    }

    return "Item deleted successfully";
};

module.exports = { addItem, getItems, getItem, updateItem, deleteItem };