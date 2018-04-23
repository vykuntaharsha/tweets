const Tweet = require('../../../models/tweet');
const Comment = require('../../../models/comment');
const User = require('../../../models/user');
const Activity = require('../../../models/activity');

module.exports = (req, res) => {
    if(!req.auth){
        return res.status(401).json({ message : 'not authorized' });
    }

    const tweetId = req.params.id;
    const userId = req.auth.id;

    Tweet.findOneAndRemove({_id: tweetId, owner : userId}).exec()
        .then(doc => {
            if(!doc){
                return Promise.reject('no such tweet');
            }
            return Promise.resolve(doc);
        })
        .then(doc => {
            Activity.deleteMany({tweet : tweetId}).exec();
            Comment.deleteMany({tweet : tweetId}).exec();
            User.findByIdAndUpdate(userId, {$inc : {tweetsCount : -1}}, {new : true}, (err, result)=>{
                if(err || !result){
                    return res.status(400).json({message : 'cannot update user'})
                }

                return res.status(200).json({user : result});
            });
        })
        .catch(error => res.status(400).json({message: "can't delete tweet"}));

};
