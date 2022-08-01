require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { signInToken } = require('../../utils/auth')
const User = require("../../models/User")

const registerUser = async (req, res) => {
    try {
        const body = req.body;
        const isAdded = await User.findOne({ username: body.username });

        if (isAdded) {
            res.send({
                name: isAdded.name,
                email: isAdded.email,
                message: 'Email Already Verified!',
            });
        } else {
            const newUser = new User(body);

            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);
            newUser.save().then((doc) => res.status(201).send(doc))

            const token = signInToken(newUser);
            res.json({
                token,
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                message: 'Email Verified successfully!',
            });
        }
    } catch (error) {
        console.log({ "error": error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const body = req.body;
        const user = await User.findOne({ username: body.username });
        if (user) {
            // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(body.password, user.password);
            if (validPassword) {
                const token = signInToken(user);

                res.status(200).json({
                    username: user.username,
                    message: "Valid password",
                    token: token
                });
            } else {
                res.status(400).json({ error: "Invalid Password" });
            }
        } else {
            res.status(401).json({ error: "User does not exist" });
        }
    } catch (error) {
        console.log({ "error": error.message });
    }
};

const getUsers = async (_, res) => {
    try {
        res.json("ok")
    } catch (error) {
        console.log({ "error": error.message });
    }
};

const blockUsers = async (req, res) => {
    try {
        let count = 0
        const usersArr = req.body.users
        console.log(usersArr)
        usersArr.forEach(async element => {

            const filter = { _id: element.id };
            const update = { status: element.status };

            await User.findOneAndUpdate(filter, update)

            count++
            if(usersArr.length == count) {
                res.json({
                    message: "updated successfully"
                })
            }
        });
    } catch (error) {
        console.log({ "error": error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    blockUsers
}