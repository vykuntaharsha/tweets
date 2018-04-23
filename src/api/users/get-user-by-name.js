const User = require('../../../models/user');

module.exports = (req, res) => {

    if(!req.auth){
        return res.status(401).json({message : 'not authorized'});
    }

    const name = req.params.name;

    User.findOne({screenName : name}, (err, doc) => {
        if(!doc || err){
            res.status(404).send('no such user');
            return;
        }

        const user = doc.toObject();
        if(user._id.toString() === req.auth.id){
            user.isFollowingByUser = null
            return res.status(200).json({user});
        }

        User.findOne({_id : req.auth.id, followees: user._id}, (err, result)=>{
            if(!result || err){
                user.isFollowingByUser = false;

            }else {
                user.isFollowingByUser = true;
            }
            return res.status(200).json({user});
        })
    })
};
