const User = require('../../../models/user');

module.exports = (req, res) => {
    if(!req.auth){
        res.status(400).send('invalid token');
    }

    const tokenId = req.headers.authorization.split(' ')[1];
    const userId = req.auth.id;

    User.removeSessionToken(userId, tokenId, (error, result )=> {
        if(error){
            return res.status(500).send('Something is not right');
        }
        return res.status(200).send('user logged out');
    });
};
