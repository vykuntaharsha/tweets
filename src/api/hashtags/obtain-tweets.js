const Tweet = require('../../../models/tweet');
const customiseTweets = require('../tweets/customise-tweets');
const User = require('../../../models/user');

module.exports = (req, res)=>{
    if(!req.auth){
        return res.status(401).json({message : 'not authorized'});
    }

    const perPage = parseInt(req.query.limit) || 10;
    const pageNo = parseInt(req.query.page) || 0;
    const tag = req.params.tag;

    Tweet.aggregate()
        .match({'hashtags' : tag})
        .sort('-createdAt')
        .skip(perPage * pageNo)
        .limit(perPage)
        .lookup({
            from : User.collection.collectionName,
            localField : 'owner',
            foreignField : '_id',
            as : 'owner'
        })
        .unwind('owner')
        .project({'owner.twitterTokens' : 0, 'owner.followees' : 0})
        .allowDiskUse(true)
        .exec()
        .then(docs => {
            if(!docs || docs.length === 0){
                return res.status(200).json([]);
            }

            customiseTweets(docs, req.auth.id, (result) => {
                return res.status(200).json(result);
            });
        })
        .catch(error => res.status(400).json({message: 'couldnot get tweets'}));


};
