const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const User = require('./user');

const Schema = mongoose.Schema;

const followerSchema = new Schema({

    followerId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },

    followeeId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },

    accepted : {
        type : Boolean,
        default : false
    }

});

followerSchema.plugin(timestamps);

const Follower = mongoose.model('Follower', followerSchema);

Follower.getFollowersOfUser = function( name, callback ){
    User.getUserByName(name, (err, user)=> {
        if(err) throw err;
        Follower.find({followeeId : user._id})
        .populate('followerId')
        .exec(callback);
    });
}

module.exports = Follower;
