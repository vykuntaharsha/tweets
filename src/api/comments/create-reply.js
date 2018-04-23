const Comment = require('../../../models/comment');

module.exports = (req, res)=>{

    if(!req.auth){
        return res.status(401).json({message : 'user not authorized'});
    }

    const commentId = req.params.commentId;
    const userId = req.auth.id;
    const text = req.body.text;

    Comment.findById(commentId).exec()
        .then(doc => {
            const comment = {
                tweet : doc.tweet,
                owner : userId,
                parentComment : doc._id,
                text
            }

            return Comment.create(comment);
        })
        .then(doc=> {

            Comment.findByIdAndUpdate(commentId, {
                $inc : {repliesCount : 1}
            }, {new : true}, (err, result) => {
                if(err){
                    return Promise.reject(err);
                }
            });

            return doc.populate('owner').execPopulate();
        })
        .then(reply => res.status(200).json({comment : reply}))
        .catch(error => res.status(400).json({message : 'cannot create'}))
};
