const User = require('../../../models/user');

module.exports = (req, res) => {

    if(!req.user || !req.token){
        return res.status(500).send('Something is not right');
    }

    User.addSessionToken(req.user._id, req.token, (error, result)=>{
        if(error) {
            return res.status(500).send('Something is not right');;
        }
        return res.status(200).json({
            user : req.user,
            token : req.token
        });
    });
};
