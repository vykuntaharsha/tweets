const Follower = require('../../../models/follower');


module.exports = (req, res) => {
    const name = req.params.name;

    Follower.getFollowersOfUser(name, (err, followers)=>{
        if(err){
            res.status(400).send('no such user');
            return;
        }
        res.status(200).json({followers});
    });

};
