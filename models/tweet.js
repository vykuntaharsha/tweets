const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const User = require('./user');
const Activity = require('./activity');
const ranks = require('./config').activityRanks;
const twitter = require('twitter-text');

const Schema = mongoose.Schema;

const tweetSchema = new Schema({

    text : {
        type : String,
        validate:  [tweetValidator, '{PATH} is not a valid tweet'],
    },

    media : String,

    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },

    likesCount : {
        type : Number,
        default : 0
    },

    commentsCount : {
        type : Number,
        default : 0
    },

    hashtags : [String],

    userMentions : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }]
});


tweetSchema.plugin(timestamps);

function  tweetValidator( text ){
    return twitter.parseTweet(text).valid;
}

tweetSchema.post('save', (tweet)=> {
    User.findByIdAndUpdate(tweet.owner, {$inc : {tweetsCount : 1 }}, {new : true}, (err, doc)=>{
        if(err) throw err;
    });
    Activity.create({
        source : tweet.owner,
        rank : ranks.POST,
        type : 'post',
        tweet : tweet._id
    });

    tweet.userMentions.forEach(mention => {
        Activity.create({
            source : mention,
            rank : ranks.MENTION,
            type : 'mention',
            tweet : tweet._id
        });
    });

});


const Tweet = mongoose.model('Tweet', tweetSchema);

Tweet.createTweet = function (text, userId) {

    const hashtags = twitter.extractHashtags(text);
    const userMentions = twitter.extractMentions(text);

    const tweet = {
        text : text,
        owner : userId,
        hashtags,
        userMentions
    }

    return this.create(tweet);
}

Tweet.updateTweet = function (id, userId, text) {
    const hashtags = twitter.extractHashtags(text);
    const mentions = twitter.extractMentions(text);

    const tweet = {
        text : text,
        $set : {
            hashtags,
            userMentions
        }
    }

    return this.findOneAndUpdate({_id :id, owner : userId}, tweet,
        {new: true}).exec();

}


module.exports = Tweet;
