const Comment = require('../../../models/comment');

module.exports = (req, res)=> {
    if(!req.auth) {
        return res.status(401).json({message : 'not authorized'});
    }

    const tweetId = req.params.id;
    const userId = req.auth.id;
    const text = req.body.text;

    const comment = {
        tweet : tweetId,
        owner : userId,
        text
    };

    Comment.create(comment)
        .then((doc) => doc.populate('owner').execPopulate())
        .then(comment=> res.status(200).json({comment}))
        .catch(error =>res.status(400).json({message: "can't create comment"}));
};
