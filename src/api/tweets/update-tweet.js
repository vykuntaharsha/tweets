const Tweet = require('../../../models/tweet');

module.exports = (req, res, next) => {
    if(!req.auth){
        return res.status(401).json({ message : 'not authorized' });
    }

    const tweetId = req.params.id;
    const userId = req.auth.id;

    if(!req.body || !req.body.tweet){
        return res.status(400).json({message : 'no content provided to update'});
    }

    const text = req.body.tweet.text;

    Tweet.updateTweet(tweetId, userId, text)
        .then( doc => doc.populate('owner').execPopulate())
        .then(tweet => res.status(200).json({tweet}))
        .catch(error => res.status(400).json({message: "can't update tweet"}));
};
