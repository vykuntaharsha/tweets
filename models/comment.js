const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Activity = require('./activity');
const twitter = require('twitter-text');
const Tweet = require('./tweet');

const Schema = mongoose.Schema;

const commentSchema = new Schema({

    text : {
        type : String,
        required : true,
        validate : [commentValidator, '{PATH} is not a valid comment']
    },

    tweet : {
        type : Schema.Types.ObjectId,
        ref : 'Tweet',
        required : true
    },

    repliesCount : {
        type : Number,
        default : 0
    },
    
    parentComment : {
        type : Schema.Types.ObjectId,
        ref : 'Tweet',
        default : null
    },

    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required :true
    }

});

commentSchema.plugin(timestamps);

function commentValidator( text ) {
    return twitter.parseTweet(text).valid;
}

function arrayLimit(val) {
  return val.length < 1000;
}

commentSchema.post('save', (doc) => {
    Activity.create({
        source : doc.owner,
        type : 'comment',
        tweet : doc.tweet
    });

    Tweet.findByIdAndUpdate(doc.tweet, {$inc : {commentsCount : 1}}, {new : true}, (err, tweet)=>{
        if(err) throw err;
    })
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
