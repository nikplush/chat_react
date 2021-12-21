const express = require('express');
const {registrationUser, loginUser} = require("../Controllers/auth");
const authRouter = express.Router();

const userNameCheck = (req, res, next) => {
    const {userName, password} = req.body;
    if (!userName || !password) {
        return res.send("Invalid inputs").status(403);
    }
    return next();
}

authRouter.post('/login', userNameCheck, loginUser)

authRouter.post('/registration', userNameCheck, registrationUser)

module.exports = authRouter
