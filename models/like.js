const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const Activity = require('./activity');
const ranks = require('./config').activityRanks;

const likeSchema = new Schema({

    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    tweet : {
        type : Schema.Types.ObjectId,
        ref : 'Tweet'
    }
});

likeSchema.plugin(timestamps);
likeSchema.post('save', (doc)=> {
    Activity.create({
        source : doc.user,
        rank : ranks.LIKE,
        type : 'like',
        tweet : doc.tweet
    });
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
