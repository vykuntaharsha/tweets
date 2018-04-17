const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const FeedItem = require('./feeditem');
const Follower = require('./follower');

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

activitySchema.post('save', (doc)=> {
    Follower.find({
        followee : doc.source,
        accepted : true
    })
    .select('follower')
    .lean()
    .exec()
    .then(followers => {
        followers.forEach(item => {
            FeedItem.findOneAndUpdate({
                user : item.follower,
                tweet : doc.tweet
            }, {
                $inc : {score : doc.rank}
            }, {upsert : true, new : true}, (err, doc)=>{
                if(!doc || err) throw new Error('no feed');
            });
        });
    })
    .catch(error => console.log(error));
});

const Activity = mongoose.model('Activity', activitySchema);




module.exports = Activity;
