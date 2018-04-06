const User = require('../../../models/user');

module.exports = (req, res, next)=> {

    User.getOrCreateUser( req.body.accessToken, req.body.accessTokenSecret, req.profile, (error, user) => {
        if(error){
            return req.status(500).send('Something is not right');
        }

        req.user = user;
        next();
    });
};
