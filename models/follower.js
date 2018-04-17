const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const User = require('./user');

const Schema = mongoose.Schema;

const followerSchema = new Schema({

    follower : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },

    followee : {
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


module.exports = Follower;
