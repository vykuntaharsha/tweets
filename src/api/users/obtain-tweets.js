const User = require('../../../models/user');
const Tweet = require('../../../models/tweet');
const customiseTweets = require('../tweets/customise-tweets');

module.exports = (req, res, next)=>{

    if(!req.auth){
        return res.status(401).json({message: 'user not authorized'});
    }
    const perPage = parseInt(req.query.limit) || 10;
    const pageNo = parseInt(req.query.page) || 0;



    const screenName = req.params.name;

    User.findOne({screenName}).exec()
        .then(user => {
            if(req.query.liked === 'true'){
                req.user = user;
                req.perPage = perPage;
                req.pageNo = pageNo;
                next();
                return;
            }
            Tweet.find({owner : user._id})
                .sort('-createdAt')
                .skip(perPage * pageNo)
                .limit(perPage)
                .populate({path :'owner', options:{lean: true}})
                .lean()
                .exec()
                .then(tweets => {

                    if(tweets.length === 0){
                        return res.status(200).json([]);
                    }
                    customiseTweets(tweets, req.auth.id, (result)=>{
                        res.status(200).json(result);
                    })
                })
                .catch(error => res.status(400).json({message : 'couldnot find tweets'}))

        })
        .catch(error => res.status(404).json({message : 'couldnot find user'}));
};
