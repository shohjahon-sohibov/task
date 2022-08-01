const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getUsers, blockUsers } = require('./user/user')

router
    .post('/api/register', registerUser)  // => register user
    .post('/api/login', loginUser)  // => login user
    .get('/api/users', getUsers)  // => get all users
    .post('/api/block', blockUsers)  // => block all users or one user

module.exports = router