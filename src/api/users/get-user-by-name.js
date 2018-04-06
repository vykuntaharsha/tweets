const User = require('../../../models/user');

module.exports = (req, res) => {

    const name = req.params.name;

    User.getUserByName(name, (err, user) => {
        if(err){
            res.status(400).send('no such user');
            return;
        }
        res.status(200).json({user});
    })
};
