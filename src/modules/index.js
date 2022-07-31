const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('./user/user')

router
    .post('/api/register', registerUser)  // => register user
    .post('/api/login', loginUser);  // => login user

module.exports = router