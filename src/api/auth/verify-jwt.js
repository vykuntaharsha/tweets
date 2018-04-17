const jwt = require('express-jwt');
const config = require('../../config');

module.exports = jwt({
    secret : config.jwtSecret,
    requestProperty : 'auth',
    getToken : function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];

    }
        return null;
    }
});
