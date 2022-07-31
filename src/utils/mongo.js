const mongoose = require('mongoose')
require('../models/User')
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/itransaction")
    } catch (error) {
        console.log("mongodb connection failed!", { "error": error.message });
    }
}

module.exports = connectDB;