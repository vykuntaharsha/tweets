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

    private : {
        type : Boolean,
        default : false
    },

    verified : {
        type : Boolean,
        default : false
    },

    followersCount : {
        type : Number,
        default : 0
    },

    friendsCount : {
        type : Number,
        default : 0
    },

    profilePicture : String,

    sessionTokens : {
        type : [String],
        select : false
    },

    twitterTokens : {
        type : {
            token: String,
            tokenSecret : String
        },
        select : false
    }
});

userSchema.plugin(timestamps);

const User = mongoose.model('User', userSchema);

User.getUsers = function (callback, noOfUsers){
    this.find()
    .limit(noOfUsers)
    .exec(callback);
};

User.getOrCreateUser = function (token, tokenSecret, profile, callback){

    this.findOne({ twitterId : profile.id })
    .exec( (err, user)=> {

        if(!user){
            const userData = profile._json
            const newUser = {
                twitterId : userData.id_str,
                name : userData.name,
                screenName : userData.screen_name,
                profilePicture : userData.profile_image_url,
                twitterTokens : {
                    token : token,
                    tokenSecret : tokenSecret
                }
            };

            return User.create(newUser, callback(err, user));

        }else {
            return callback(null, user);
        }
    });
};

User.getUserByName = function (name, callback){
    this.find({name})
    .exec(callback);
};

User.getSessionTokens = function (id, callback){
    this.findById(id).select('sessionTokens').exec(callback);
};


User.addSessionToken = function (id, token, callback) {
    this.findByIdAndUpdate(id, {$push : {sessionTokens : token }}, {new : true})
    .exec(callback);
};

User.removeSessionToken = function (id, token, callback){
    this.findByIdAndUpdate(id, {$pull : {sessionTokens : token }}, {new : true})
    .exec(callback);
};

module.exports = User;
