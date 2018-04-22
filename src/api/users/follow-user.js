const User = require('../../../models/user');

module.exports = (req, res)=>{

    if(!req.auth){
        return res.status(401).json({message : 'user is not authenticated'});
    }
    const followeeName = req.params.name;
    User.findOne({screenName : followeeName})
        .exec()
        .then(followee => {
            if(!followee){
                return Promise.reject('not registered');
            }

            User.findByIdAndUpdate(req.auth.id,{
                    $push : {followees : followee._id },
                    $inc : {followingCount : 1}
                },{
                    new: true
                })
                .exec()
                .then(user => {
                    if(!user){
                        return Promise.reject('couldnot update');
                    }
                    return User.findByIdAndUpdate(followee._id, {$inc : {followersCount : 1}}, {new : true})
                    .exec()
                    .then(followee => {
                        res.status(200).json({user})
                    });
                })

        })
        .catch(error =>res.status.json(400).json({message : 'cannot follow'}));
};
