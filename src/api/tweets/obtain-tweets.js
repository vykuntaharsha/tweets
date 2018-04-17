const Tweet = require('../../../models/tweet');

module.exports = (req, res)=>{
    const perPage = req.query.limit || 25;
    const pageNo = req.query.page || 0;

    Tweet.find({})
        .limit(perPage)
        .skip(perPage * pageNo)
        .sort('-updatedAt')
        .populate('owner', 'screenName profilePicture')
        .execPopulate()
        .then(tweets => res.status(200).json({tweets}))
        .catch(err => res.status(500).json({ message : 'something is not right'}));

};
