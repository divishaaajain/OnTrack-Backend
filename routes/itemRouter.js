const express = require("express");
const { addItems } = require("../controllers/itemController");

const router = express.Router();

router.get("/items", async() => {
    result = await addItems();
});

module.exports = router;