const Tweet = require('../../../models/tweet');
const Like = require('../../../models/like');

module.exports = (req, res)=> {
    if(!req.auth) {
        return res.status(401).json({message : 'not authorized'});
    }

    const tweetId = req.params.id;
    const userId = req.auth.id;

    Like.findOne({tweet : tweetId, user : userId}).exec()
        .then(doc => {
            if(!doc){
                return Like.create({tweet : tweetId, user : userId})
                    .then(() => Tweet.findByIdAndUpdate(tweetId, {$inc : {likesCount : 1}}, {new : true}))

            }
            return Like.findOneAndRemove({tweet: tweetId, user : userId}).exec()
                    .then(() => Tweet.findByIdAndUpdate(tweetId, {$inc : {likesCount : -1}}, {new : true}))
        })
        .then( doc => doc.populate('owner').execPopulate())
        .then(  doc => {
            const tweet = doc.toObject();
            Like.findOne({tweet: tweetId, user: userId}, (err, doc) =>{
                if(doc){
                    tweet.isLikedByUser = true;
                }else {
                    tweet.isLikedByUser = false;
                };
                return res.status(200).json({tweet});
            })
        })
        .catch(error => res.status(500).json({message : 'something is not right'}));

};
