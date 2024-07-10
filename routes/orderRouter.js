// Uncomment line 31 in index.js file if you have successfully added the sql configs and started the SQL local server, to perform further operations.
const express = require("express");
const { addOrder, getOrders, getOrder, deleteOrder } = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/order", auth, async (req, res, next) => {
    try {
        const result = await addOrder({ 
            orderDetails: req.body,  
            user_id: req.user_id
        });

        res.status(201).send(result);
    } catch (error) {
        error.data = "ADD_ORDER"
        next(error);
    }
});

router.get("/orders", auth, async (req, res, next) => {
    try {
        const result = await getOrders({
            user_id: req.user_id
        });

        res.status(200).send(result);
    } catch (error) {
        error.data = "GET_ORDERS"
        next(error);
    }
});

router.get("/order/:id", auth, async (req, res, next) => {
    try {
        const result = await getOrder({
            user_id: req.user_id,
            orderId: req.params.id
        });

        res.status(200).send(result);
    } catch (error) {
        error.data = "GET_ORDER"
        next(error);
    }
});

router.delete("/order/:id", auth, async (req, res, next) => {
    try {
        const result = await deleteOrder({
            user_id: req.user_id,
            orderId: req.params.id
        });

        res.status(200).send(result);
    } catch (error) {
        error.data = "DELETE_ORDER"
        next(error);
    }
});


module.exports = router;