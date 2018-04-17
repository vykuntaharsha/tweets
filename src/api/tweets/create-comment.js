const Tweet = require('../../../models/tweet');
const Comment = require('../../../models/comment');

module.exports = (req, res)=> {
    if(!req.auth) {
        return res.status(401).json({message : 'not authorized'});
    }

    const tweetId = req.params.id;
    const userId = req.auth.id;
    const parentId = req.body.parentCommentId || null;
    const text = req.body.text;

    const comment = {
        tweet : tweetId,
        owner : userId,
        parentComment : parentId,
        text
    };

    Comment.create(comment)
        .then(doc => {
            Tweet.findByIdAndUpdate(tweetId, {$inc : {commentsCount : 1 }});
            res.status(200).json({comment : doc});
        })
        .catch(error =>res.status(400).json({message: "can't create comment"}));
};
