const User = require('../../../models/user');
const mongoose = require('mongoose');

module.exports = (req, res)=>{
    if(!req.auth){
        return res.status(401).json({message : 'not authorized'});
    }

    const perPage = parseInt(req.query.limit) || 5;
    const pageNo = parseInt(req.query.page) || 0;

    User.findById(req.auth.id)
        .select('followees')
        .lean().exec()
        .then(user => {
            const ObjectId = mongoose.Types.ObjectId;

            const followees = user.followees.map(id=> ObjectId(id));
            followees.push(ObjectId(user._id));


            return User.aggregate()
                .match({ _id :  {$nin : followees}})
                .addFields({
                    relevancy : {
                        $multiply : [
                            {$add: [
                                {$multiply : [3, '$followersCount']},
                                '$tweetsCount',
                                {$multiply : [2, '$followingCount']}
                            ]},
                            { $divide : [
                                1,
                                {$subtract : [new Date(), "$updatedAt"]}
                            ]}
                        ]
                    }
                })
                .sort('-relevancy')
                .skip(perPage * pageNo)
                .limit(perPage)
                .project({
                    screenName : 1,
                    name : 1,
                    profilePicture : 1,
                    profileBackground : 1,
                    followersCount : 1,
                    followingCount : 1,
                    tweetsCount : 1,
                    verified : 1
                })
                .allowDiskUse(true)
                .exec();
        })
        .then(docs => {
            if(!docs || docs.length === 0){
                return res.status(200).json([]);
            }
            return res.status(200).json(docs);
        })
        .catch(error => res.status(400).json({message : 'couldnot get'}))
};
