const User = require('../../../models/user');

module.exports = (req, res, next) => {
    if(!req.auth){
        return res.status(401).send('token is not authorized');
    }

    User.findById(req.auth.id, (error, user) => {
        if(error){
            return res.status(500).send('Something went wrong');
        }

        if(!user){
            return res.status(400).json('user not registered');
        }

        return res.status(200).json({user});
    });

};
