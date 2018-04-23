const Tweet = require('../../../models/tweet');

module.exports = (req, res)=>{


    const perPage = parseInt(req.query.limit) || 5;
    const pageNo = parseInt(req.query.page) || 0;

    Tweet.aggregate()
        .unwind('hashtags')
        .sortByCount('hashtags')
        .skip(perPage * pageNo)
        .limit(perPage)
        .allowDiskUse(true)
        .exec()
        .then(docs => {
            const hashtags = docs.map(item => ({
                hashtag : item._id,
                noOfTweets : item.count
            }));
            res.status(200).json({hashtags});
        })
        .catch(error => res.status(400).json({message: 'cannot get hashtags'}))

};
