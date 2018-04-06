const config = require('../../config');
const request = require('request');


module.exports = (req, res) => {
    const twitter = {
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
        oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
        consumer_key: config.consumerKey,
        consumer_secret: config.consumerSecret
        }
    };

    request.post( twitter, (error, response, body) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      const jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';

      res.status(302).send(jsonStr);
    });
};
