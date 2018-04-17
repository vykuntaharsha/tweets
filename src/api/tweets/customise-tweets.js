const Like = require('../../../models/like');
const getCustomTweet = (tweetId, userId, callback)=>{
    Like.findOne({tweet: tweetId, user: userId}, (err, doc) =>{
        if(doc){
            return callback(true);
        }
        return callback(false);
    })
}

module.exports = (docs, userId, callback) => {
    let done = 0;
    const tweets = [];

    docs.forEach((item, index) => {
        getCustomTweet(item._id, userId, (flag)=>{
            done += 1;

            const tweet = {
                ...item,
                isLikedByUser : flag
            }

            delete tweet.owner.twitterTokens;
            tweets[index]=tweet;

            if(done === docs.length){
                return callback(tweets);
            }
        })
    })
}
