const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "active"
        },
        last_login_time: {
            type: String,
            required: false,
        },  
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.mongoose.model('User', userSchema)

module.exports = User