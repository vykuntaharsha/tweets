const Twitter = require('twitter');
const config = require('../../config');


module.exports = (req, res, next)=>{

    const client = new Twitter({
        consumer_key : config.consumerKey,
        consumer_secret : config.consumerSecret,
        access_token_key : req.body.accessToken,
        access_token_secret : req.body.accessTokenSecret
    });


    client.get('account/verify_credentials', (error, data, response)=> {
        if(error){
            return res.status(500).send(" couldn't connect to twitter at this time ");
        }
        req.profile = data;
        next();
    })

};
