const Tweet = require('../../../models/tweet');
const User = require('../../../models/user');

module.exports = (req, res)=>{

    if(!req.auth) {
        return res.status(401).json({message : 'not authorized'});
    }

    const tweetId = req.params.id;

    Tweet.findById(tweetId).populate('owner').execPopulate()
        .then( tweet => res.status(200).json({ tweet }))
        .catch( error => res.status(500).json({message : 'something went wrong'}));
};
