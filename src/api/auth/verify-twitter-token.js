const config = require('../../config');
const request = require('request');

module.exports = (req, res, next) => {

    const twitter = {
          url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
          oauth: {
            consumer_key: config.consumerKey,
            consumer_secret: config.consumerSecret,
            token: req.query.oauth_token
          },
          form: { oauth_verifier: req.query.oauth_verifier }
      };

    request.post( twitter, (err, r, body) => {
            if (err) {
              res.send(500, { message: err.message });
              return;
            }

            const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
            const parsedBody = JSON.parse(bodyString);

            req.body['accessToken'] = parsedBody.oauth_token;
            req.body['accessTokenSecret'] = parsedBody.oauth_token_secret;
            req.body['userId'] = parsedBody.user_id;

            next();
        });
};
