const User = require('../../../models/user');

module.exports = (req, res) => {

    User.getUsers((err, users) => {

        if(err) {
            res.status(500).send('we are working on it');
            return;
        }
        res.status(200).json({users});
    });
};
