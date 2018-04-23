const User = require('../../../models/user');

module.exports = (req, res) => {
    if(!req.auth){
        return res.status(401).send('token is not authorized');
    }

    User.findById(req.auth.id).exec()
        .then(user => user ? res.status(200).json({user}) : Promise.reject('not registered'))
        .catch(error => res.status(400).json({message : 'user not registered'}));

};
