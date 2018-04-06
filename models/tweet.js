const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const tweetSchema = new Schema({

    text : {
        type : String,
        validate:  [tweetValidator, '{PATH} is not a valid tweet'],
    },

    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },

    replyToTweetId : {
        type : Schema.Types.ObjectId,
        ref : 'Tweet'
    },

    isReplyTweet : {
        type : Boolean,
        default : false
    },

    quotedTweetId : {
        type : Schema.Types.ObjectId,
        ref : 'Tweet'
    },

    isQuotedTweet : {
        type : Boolean,
        default : false
    },

    retweetId : {
        type : Schema.Types.ObjectId,
        ref : 'Tweet'
    },

    isReTweet : {
        type : Boolean,
        default : false
    },

    replyCount : {
        type : Number,
        default: 0
    },

    retweetCount : {
        type : Number,
        default : 0
    },

    favouriteCount : {
        type : Number,
        default : 0
    }

});


tweetSchema.plugin(timestamps);

function tweetValidator( text ) {
    return twttr.txt.parseTweet(text).valid;
}

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
