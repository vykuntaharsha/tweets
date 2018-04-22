const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

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
        required : true
    },

    screenName : {
        type : String,
        required : true,
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
    },

    followees : {
        type : [{
            type : Schema.Types.Object,
            ref : 'User',

        }],
        validate : [arrayLimit, '{PATH} exceeds the limit of 999'],
        select : false
    }
});

userSchema.plugin(timestamps);

function arrayLimit(val) {
  return val.length < 1000;
}

const User = mongoose.model('User', userSchema);

User.getUsers = function (noOfUsers){
    return this.find().limit(noOfUsers).exec();
};


User.createUser = function (token, tokenSecret, profile){
    const background = profile.profile_background_image_url || 'http://abs.twimg.com/images/themes/theme1/bg.png' ;

    const newUser = {
        twitterId : profile.id_str,
        name : profile.name,
        screenName : profile.screen_name,
        profilePicture : getProfilePicture(profile.profile_image_url),
        profileBackground : background,
        twitterTokens : {
            token : token,
            tokenSecret : tokenSecret
        }
    };

    return this.create(newUser);
};

function getProfilePicture(img) {
    if(!img) {
        return 'http://abs.twimg.com/sticky/default_profile_images/default_profile.png';
    }

    return img.slice(0, -11) +'.png';
}
module.exports = User;
