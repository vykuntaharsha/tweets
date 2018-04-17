const User = require('../../../models/user');

module.exports = (req, res) => {
    if(!req.auth){
        res.status(400).send('invalid token');
    }

    const userId = req.auth.id;

    User.findById( userId ).exec()
        .then(user => user ? res.status(200).json({message : 'user logged out'}) : Promise.reject('not authorized'))
        .catch(error => res.status(400).json({message: 'user not registered'}));
};
