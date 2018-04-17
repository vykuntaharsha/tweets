const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Activity = require('./activity');
const twitter = require('twitter-text');

const Schema = mongoose.Schema;

const commentSchema = new Schema({

    text : {
        type : String,
        required : true,
        validate : [commentValidator, '{PATH} is not a valid comment']
    },

    tweet : {
        type : Schema.Types.ObjectId,
        ref : 'Tweet'
    },

    parentComment : {
        type : Schema.Types.ObjectId,
        ref : 'Comment'
    },

    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }

});

commentSchema.plugin(timestamps);

function commentValidator( text ) {
    return twitter.parseTweet(text).valid;
}

commentSchema.post('save', (doc) => {
    Activity.create({
        source : doc.owner,
        type : 'comment',
        tweet : doc.tweet
    });
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
