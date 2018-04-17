const Comment = require('../../../models/comment');

module.exports = (req, res)=>{
    const tweet = req.params.id;
    const parentComment = req.params.parent;
    const perPage = req.query.limit || 5;
    const pageNo = req.query.page || 0;

    Comment.find({tweet, parentComment})
            .select('text owner updatedAt')
            .limit(perPage)
            .skip(perPage * pageNo)
            .sort('-updatedAt')
            .populate('owner', 'screenName profilePicture')
            .execPopulate()
            .then(comments => res.status(200).json({comments}))
            .catch(error =>res.status(400).json({message:'no comments found'}));
};
