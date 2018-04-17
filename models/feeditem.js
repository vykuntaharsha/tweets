const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const feedItemSchema = new Schema({

    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },

    tweet : {
        type : Schema.Types.ObjectId,
        ref : 'Tweet'
    },

    score : {
        type : Number,
        default : 0
    },
});

feedItemSchema.plugin(timestamps);

const FeedItem = mongoose.model('FeedItem', feedItemSchema);

module.exports = FeedItem;
