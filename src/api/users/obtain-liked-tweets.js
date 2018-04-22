const Like = require('../../../models/like');
const Tweet = require('../../../models/tweet');
const User = require('../../../models/user');
const customiseTweets = require('../tweets/customise-tweets');


module.exports = (req, res)=>{

    Like.aggregate()
        .match({user : req.user._id})
        .sort('-createdAt')
        .skip(req.pageNo * req.perPage)
        .limit(req.perPage)
        .lookup({
            from : Tweet.collection.collectionName,
            localField : 'tweet',
            foreignField : '_id',
            as : 'tweet'
        })
        .unwind('tweet')
        .lookup({
            from : User.collection.collectionName,
            localField : 'tweet.owner',
            foreignField : '_id',
            as : 'tweet.owner'
        })
        .unwind('tweet.owner')
        .project({tweet : 1, _id : 0})
        .allowDiskUse(true)
        .exec()
        .then(docs => {
            if(docs.length === 0){
                return res.status(200).json([]);
            }
            const tweets = docs.map(item => item.tweet);
            customiseTweets(tweets, req.auth.id, (result)=>{
                res.status(200).json(result);
            })
        })
        .catch(error => res.status(400).json({ message : "can't fetch"}));

};
