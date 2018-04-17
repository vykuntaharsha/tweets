const Tweet = require('../../../models/tweet');
const Comment = require('../../../models/comment');
const User = require('../../../models/user');

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
            User.findByIdAndUpdate(doc.owner, {$inc : {tweetsCount : -1}});
            return Comment.deleteMany({tweet : doc._id}).exec();
        })
        .then( () => res.sendStatus(200))
        .catch(error => res.status(400).json({message: "can't delete tweet"}));

};
