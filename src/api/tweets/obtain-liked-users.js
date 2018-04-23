const Like = require('../../../models/like');

module.exports = (req, res) => {
    const tweetId = req.params.id;
    const perPage = req.query.limit || 5;
    const pageNo = req.query.page || 0;

    Like.find({tweet : tweetId})
        .select('user')
        .limit(perPage)
        .skip(perPage * pageNo)
        .sort('-updatedAt')
        .populate('user', 'screenName profilePicture')
        .execPopulate()
        .then(users => res.status(200).json({users}))
        .catch(err => res.status(500).json({ message : 'something is not right'}));
};
