const jwt = require('express-jwt');
const User = require('../../../models/user');
const jsonWebToken = require('jsonwebtoken');
const config = require('../../config');

const isRevokedCallback = function(req, payload, done){
  const tokenId = req.headers.authorization.split(' ')[1];

  const secret = config.jwtSecret;
  const userId = jsonWebToken.verify(tokenId, secret).id;

  User.getSessionTokens(userId, function(err, data){
    if (err) return done(err);
    const isRevoked = !data.sessionTokens.includes(tokenId);
    return done(null, isRevoked);
  });
};

module.exports = jwt({
    secret : config.jwtSecret,
    isRevoked : isRevokedCallback,
    requestProperty : 'auth',
    getToken : function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];

    }
        return null;
    }
});
