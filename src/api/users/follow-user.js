const Follower = require('../../../models/follower');

module.exports = (req, res)=>{

    const followeeName = req.params.name;
    const followerName = req.params.follower;

    Follower.addFollower( followerName, followeeName, (err, follower)=>{

        if(err){
            res.status(400).send(err);
            return;
        }

        if(!follower.accepted){
            //send a notification for followee
        }

        res.status(200).json({
            requested : true,
            accepted : follower.accepted
        });
    });
};
