const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = (req, res, next) => {

    const secret = config.jwtSecret;

    req.token = jwt.sign({
        id : req.user._id,
    }, secret);

    next();
};
