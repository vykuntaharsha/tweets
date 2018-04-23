const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    source : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    rank : Number,
    type : {
        type : String,
        enum : ['like', 'comment', 'post', 'mention']
    },

    tweet : {
        type : Schema.Types.ObjectId,
        ref : 'Tweet'
    }

});

activitySchema.plugin(timestamps);


const Activity = mongoose.model('Activity', activitySchema);




module.exports = Activity;
