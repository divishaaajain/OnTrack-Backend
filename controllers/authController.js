const { JWT_PRIVATE_KEY } = require("../config/config");
const { mongoDBClient } = require("../config/database");
const CustomError = require("../utils/customErrorUtil");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const collections = require("../constants/collectionNames");

const postSignup = async ({ userDetails }) => {
    const storageDB = mongoDBClient.db;

    try {
        const user = await storageDB
            .collection(collections.users)
            .findOne({ email: userDetails.email })

        if (user) {
            throw new CustomError("User already exists", 409);
        }
    } catch (error) {
        throw error;
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(userDetails.password, 12);
    } catch (error) {
        throw error;
    }

    const user = new User({
        email: userDetails.email,
        username: userDetails.username,
        phone: userDetails.phone,
        password: hashedPassword
    });

    try {
        await storageDB
            .collection(collections.users)
            .insertOne(user);
    } catch (error) {
        throw error;
    }

    return "User registered successfully";
};

const postLogin = async ({ userDetails }) => {
    const storageDB = mongoDBClient.db;

    let user;
    try {
        user = await storageDB
            .collection(collections.users)
            .findOne({ email: userDetails.email })
    } catch (error) {
        throw error;
    }

    if (!user) {
        throw new CustomError("User not found", 404);
    }

    try {
        const password = await bcrypt.compare(userDetails.password, user.password);

        if (!password) {
            throw new CustomError("Incorrect Password", 422);
        }

        const token = jwt.sign({
            email: user.email,
            user_id: user._id.toString()
        }, `${JWT_PRIVATE_KEY}`, {
            expiresIn: '1h'
        });

        return {
            message: "User logged in",
            user_id: user.user_id,
            token: token
        };

    } catch (error) {
        throw error;
    }
};

module.exports = { postSignup, postLogin };