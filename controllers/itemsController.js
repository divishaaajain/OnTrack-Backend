const { mongoDBClient } = require("../config/mongoDbDatabase");
const CustomError = require("../utils/customErrorUtil");
const { ObjectId } = require('mongodb');
const Item = require("../models/itemsModel");
const collections = require("../constants/collectionNames");
const responseMessages = require("../constants/responseMessages");

const addItem = async ({ itemDetails, user_id }) => {
    const storageDB = mongoDBClient.db;
    const date = new Date();

    const item = new Item({
        user_id: user_id,
        name: itemDetails.name,
        description: itemDetails.description,
        price: itemDetails.price,
        quantity: itemDetails.quantity,
        createdAt: date,
        updatedAt: date
    });

    try {
        await storageDB
            .collection(collections.items)
            .insertOne(item);
    } catch (error) {
        throw error;
    }

    return responseMessages.item.add;
};

const getItems = async () => {
    const storageDB = mongoDBClient.db;

    let items;
    try {
        items = await storageDB
            .collection(collections.items)
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
            .collection(collections.items)
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
            .collection(collections.items)
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

    updatedDetails = { ...updatedDetails, updatedAt: new Date() };

    try {
        await storageDB
            .collection(collections.items)
            .updateOne(
                { _id: new ObjectId(item_id) },
                { $set: updatedDetails }
            );
    } catch (error) {
        throw error;
    }

    return responseMessages.item.update;
};

const deleteItem = async ({ user_id, item_id }) => {
    const storageDB = mongoDBClient.db;

    let item;
    try {
        item = await storageDB
            .collection(collections.items)
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
            .collection(collections.items)
            .deleteOne({ _id: new ObjectId(item_id) });
    } catch (error) {
        throw error;
    }

    return responseMessages.item.delete;
};

module.exports = { addItem, getItems, getItem, updateItem, deleteItem };