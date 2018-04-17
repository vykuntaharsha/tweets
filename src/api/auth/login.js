const User = require('../../../models/user');
const createJWT = require('./create-jwt');

module.exports = (req, res) => {

    User.findOne({twitterId : req.profile.id_str}).exec()
    .then(user => {
        if(!user){
            return User.createUser(req.body.accessToken, req.body.accessTokenSecret, req.profile)
        }
        return Promise.resolve(user);
    })
    .then(user => {
        const token = createJWT(user);
        res.status(200).json({user,token});
    })
    .catch(error => res.status(500).send('Something is not right'));

};
