const config = require('../../config');
const Twitter = require('twitter');
const User = require('../../../models/user');
const Tweet = require('../../../models/tweet');

module.exports = (req, res)=>{

    if(!req.auth){
        return res.status(401).json({message : 'user not authorized'});
    }


    const tweetId = req.params.id;

    User.findById(req.auth.id)
        .select('twitterTokens screenName')
        .exec()
        .then(user => {
            if(!user){
                return res.status(403).json({message : 'user not authorized'});
            }


            const client = new Twitter({
                consumer_key : config.consumerKey,
                consumer_secret : config.consumerSecret,
                access_token_key : user.twitterTokens.token,
                access_token_secret : user.twitterTokens.tokenSecret
            });

            return Tweet.findById(tweetId).exec()
                .then(tweet => {
                    if (!tweet){
                        Promise.reject('not valid tweet id');
                    }

                    client.post('statuses/update', {status : tweet.text})
                        .then(response => {
                            const url = `https://twitter.com/${user.screenName}/status/${response.id_str}`
                            return res.status(200).json({url});
                        })
                        .catch(error => Promise.reject('not valid for twitter'))
                })


        })
        .catch(error => res.status(400).json({message : 'cannot post on twitter'}));


};
