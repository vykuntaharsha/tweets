const Comment = require('../../../models/comment');
const User = require('../../../models/user');

module.exports = (req, res)=>{
    const parentComment = req.params.commentId;
    const perPage = req.query.limit || 5;
    const pageNo = req.query.page || 0;

    Comment.find({parentComment})
            .sort('createdAt')
            .skip(perPage * pageNo)
            .limit(perPage)
            .exec()
            .then(docs => {
                if(!docs || docs.length===0){
                    return res.status(200).json({comments : []});
                }
                const comments = [];

                let count = 0;
                docs.forEach((item, index) => {
                    User.findById(item.owner, (err, user)=>{
                        count += 1;
                        const comment = item;
                        comment.owner = user;

                        comments[index] = comment;

                        if(count === docs.length){
                            return res.status(200).json({comments});
                        }
                    })
                })
            })
            .catch(error =>res.status(400).json({message:'no comments found'}));
};
