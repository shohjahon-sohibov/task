const jwt = require('jsonwebtoken');

const signInToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.username,
        },
        "JWT_SECRET",
    );
};

module.exports = {
    signInToken
}