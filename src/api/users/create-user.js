const User = require('../../../models/user');
const isValidUser = require('../validation').isValidUser;

module.exports = (req, res) => {

    const user = req.body.user;

    if( !user ){
        res.status(400).send('requires a user object in body');
        return;
    }

    if( !isValidUser(user) ){
        res.status(400).send('user data provided is not valid');
        return;
    }

    User.createUser(user, (err, user) => {
        if( err ){
            res.status(400).send('unable to create a user with provided data');
            return;
        }
        res.status(200).json({user});
    });

};
