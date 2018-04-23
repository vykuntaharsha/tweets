const User = require('../../../models/user');


module.exports = (req, res)=>{
    if(!req.auth){
        return res.status(401).json({message : 'not authorized'});
    }

    const name = req.params.name;

    User.findOne({screenName : name})
        .then(followee => {
            User.findOneAndUpdate({_id : req.auth.id, followees: followee._id }, {
                $pull : {followees : followee._id},
                $inc : {followingCount : -1}
            }, {new : true}, (err, doc)=>{

                if(err || !doc ){
                    return res.status(400).json({message : 'couldnot unfollow'});
                }
                User.findByIdAndUpdate(followee._id, {$inc : {followersCount : -1 }}, {new : true}, (err, result) => {
                    doc.isFollowingByUser = false;
                    return res.status(200).json({user : doc});
                })
            })
        })
        .catch(err => res.status(400).json({message : 'couldnot unfollow'}))
};
