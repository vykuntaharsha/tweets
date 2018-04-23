const User = require('../../../models/user');
const Tweets = require('../../../models/user');

module.exports = (req, res)=>{
    if(!req.auth){
        return res.status(401).json('not authorized');
    }
    
    const screenName = req.params.name;

    const perPage = parseInt(req.query.limit) || 5;
    const pageNo = parseInt(req.query.page) || 0;

    User.aggregate()
        .match({screenName})
        .graphLookup({
            from : User.collection.collectionName,
            startWith : '$followees',
            connectToField : '_id',
            connectFromField : 'followees',
            maxDepth : 1,
            as : 'suggestions'
        })
        .unwind('suggestions')
        .skip(perPage * pageNo)
        .limit(perPage)
        .project({_id: 0, 'suggestions.twitterTokens' : 0, 'suggestions.followees' : 0})
        .project({suggestions : 1})
        .allowDiskUse(true)
        .exec()
        .then(docs => {
            if(docs.length === 0){
                return res.status(200).json([]);
            }

            const allConnections = docs.map(item=> item.suggestions);
            User.findOne({screenName}).select('followees').lean().exec()
                .then(docs => {
                    docs.followees.push(req.auth.id);
                    const idStrings = docs.followees.map(item => item.toString());

                    const suggestions = allConnections.filter(item => !idStrings.includes(item._id.toString()));

                    return res.status(200).json(suggestions);
                })
        })
        .catch(error => res.status(404).json({message: 'user not registered'}))
};
