const Activity = require('../../../models/activity');
const Tweet = require('../../../models/tweet');
const User = require('../../../models/user');
const customiseTweets = require('../tweets/customise-tweets');


module.exports = (req, res)=> {
    if(!req.auth){
        return res.status(401).json({message : 'not authorized'});
    }

    const perPage = parseInt(req.query.limit) || 10;
    const pageNo = parseInt(req.query.page) || 0;

    User.findById(req.auth.id)
        .select('followees screenName')
        .lean().exec()
        .then(user => {
            if(user.screenName !== req.params.name){
                return Promise.reject('not authorized');
            }
            return Promise.resolve(user);
        })
        .then( user =>  {

            const followees = user.followees;
            followees.push(user._id);

            return Activity.aggregate()
                    .match({source : {$in : followees}})
                    .group({
                        _id : '$tweet',
                        score : {$sum : '$rank'}
                    })
                    .lookup({
                        from : Tweet.collection.collectionName,
                        localField : '_id',
                        foreignField : '_id',
                        as : 'tweet'
                    })
                    .unwind('tweet')
                    .addFields({
                        relevancy : {
                            $multiply : ['$score', { $divide : [1, {$subtract : [new Date(), "$tweet.updatedAt"]} ]} ]
                        }
                    })
                    .sort('-relevancy')
                    .skip(perPage * pageNo)
                    .limit(perPage)
                    .lookup({
                       from : User.collection.collectionName,
                       localField : 'tweet.owner',
                       foreignField : '_id',
                       as : 'tweet.owner'
                   })
                   .unwind('tweet.owner')
                   .project({tweet : 1, _id : 0})
                   .allowDiskUse(true)
                   .exec();


        })
        .then(docs => {
            if(docs.length === 0){
                return res.status(200).json([]);
            }
            const tweetDocs = docs.map(item => item.tweet);
            customiseTweets(tweetDocs, req.auth.id, (tweets)=>{
                res.status(200).json(tweets);
            })
        })
        .catch(error => res.status(400).json({ message : "can't fetch"}));
};
