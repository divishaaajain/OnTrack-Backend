const express = require("express");
const { addItems } = require("../controllers/itemsController");

const router = express.Router();

router.get("/items", async() => {
    result = await addItems();
});

module.exports = router;