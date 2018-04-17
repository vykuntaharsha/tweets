const Tweet = require('../../../models/tweet');
const User = require('../../../models/user');


module.exports = (req, res) => {
    if(!req.auth){
        return res.status(401).json({ message : 'not authorized' });
    }

    if(!req.body || !req.body.tweet){
        return res.status(400).json({message : 'no content provided'});
    }

    const userId = req.auth.id;
    const text = req.body.tweet.text;

    User.findById(userId).exec()
        .then( user => {
            if(user){
                return Promise.resolve(user);
            }
            return Promise.reject('not a valid user');
        })
        .then(user => Tweet.createTweet(text, user._id))
        .then(doc => doc.populate('owner').execPopulate())
        .then(tweet => res.status(200).json({tweet}))
        .catch(error => res.status(400).json({message: "can't create tweet"}));
};
