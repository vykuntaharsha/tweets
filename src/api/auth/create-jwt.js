const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = (user) => {

    const secret = config.jwtSecret;

    return jwt.sign({
        id : user._id,
    }, secret);
};
