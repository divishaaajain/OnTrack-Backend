const express = require("express");
const validateFields = require("../middleware/validator");
const { postSignup, postLogin } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", validateFields, async (req, res, next) => {
    try {
        const result = await postSignup({ userDetails: req.body });

        res.status(201).send(result);
    } catch (error) {
        error.data = "USER_SIGNUP";
        next(error);
    }
});

router.post("/login", validateFields, async (req, res, next) => {
    try {
        const result = await postLogin({ userDetails: req.body });

        res.status(200).send(result);
    } catch (error) {
        error.data = "USER_LOGIN";
        next(error);
    }
});

module.exports = router;