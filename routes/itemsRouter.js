const express = require("express");
const { addItem, getItems, getItem, updateItem, deleteItem } = require("../controllers/itemsController");
const auth = require("../middleware/authMiddleware");
const validateFields = require("../middleware/validator");

const router = express.Router();

router.post("/item", auth, validateFields, async (req, res, next) => {
    try {
        const result = await addItem({
            itemDetails: req.body,
            user_id: req.user_id
        });

        res.status(201).send(result);
    } catch (error) {
        error.data = "ADD_ITEM";
        next(error);
    }
});

router.get("/items", auth, validateFields, async (req, res, next) => {
    try {
        const result = await getItems();

        res.status(200).send(result);
    } catch (error) {
        error.data = "GET_ITEMS";
        next(error);
    }
});

router.get("/item/:id", auth, validateFields, async (req, res, next) => {
    try {
        const result = await getItem({
            item_id: req.params.id
        });

        res.status(200).send(result);
    } catch (error) {
        error.data = "GET_ITEM_BY_ID";
        next(error);
    }
});

router.put("/item/:id", auth, validateFields, async (req, res, next) => {
    try {
        const result = await updateItem({
            user_id: req.user_id,
            item_id: req.params.id,
            updatedDetails: req.body
        });

        res.status(200).send(result);
    } catch (error) {
        error.data = "UPDATE_ITEM";
        next(error);
    }
});

router.delete("/item/:id", auth, validateFields, async (req, res, next) => {
    try {
        const result = await deleteItem({
            user_id: req.user_id,
            item_id: req.params.id,
        });

        res.status(200).send(result);
    } catch (error) {
        error.data = "DELETE_ITEM";
        next(error);
    }
});

module.exports = router;