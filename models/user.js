const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Follower = require('./follower');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    twitterId : {
        type : String,
        required : true,
        unique : true,
        select : false,
        index : true
    },

    name : {
        type : String,
        required : true,
        match : [/^[a-zA-Z0-9 ]+$/, 'user name is invalid']
    },

    screenName : {
        type : String,
        required : true,
        match : [/^[a-zA-Z0-9_]+$/, 'user screen name is invalid'],
        unique : true,
        index : true
    },

    location : String,

    description : String,

    verified : {
        type : Boolean,
        default : false
    },

    followersCount : {
        type : Number,
        default : 0
    },

    followingCount :{
        type : Number,
        default : 0
    },

    tweetsCount : {
        type : Number,
        default : 0
    },

    profilePicture : String,
    profileBackground : String,

    twitterTokens : {
        type : {
            token: String,
            tokenSecret : String
        },
        select : false
    }
});

userSchema.plugin(timestamps);

userSchema.post('save', (doc)=>{
    Follower.create({
        follower : doc._id,
        followee : doc._id,
        accepted : true
    })
});


const User = mongoose.model('User', userSchema);

User.getUsers = function (noOfUsers){
    return this.find().limit(noOfUsers).exec();
};

User.createUser = function (token, tokenSecret, profile){
    const background = profile.profile_background_image_url || 'http://abs.twimg.com/images/themes/theme1/bg.png' ;

    const profilePicture = profile.profile_image_url || 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'

    const newUser = {
        twitterId : profile.id_str,
        name : profile.name,
        screenName : profile.screen_name,
        profilePicture : profilePicture,
        profileBackground : background,
        twitterTokens : {
            token : token,
            tokenSecret : tokenSecret
        }
    };

    return this.create(newUser);
};


module.exports = User;
