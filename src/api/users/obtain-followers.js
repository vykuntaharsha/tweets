const User = require('../../../models/user');
const getCustomUsers = require('./customise-users');

module.exports = (req, res) => {
    if(!req.auth){
        return res.status(401).json({message : 'not authorized'});
    }
    const name = req.params.name;
    const perPage = req.query.limit || 5;
    const pageNo = req.query.page || 0;

    User.findOne({screenName : name}).exec()
        .then(followee=> {
            if(!followee){
                return Promise.reject('not registered');
            }

            User.find({followees : followee._id})
                .skip(perPage * pageNo)
                .limit(perPage)
                .lean()
                .exec()
                .then(followers => {
                    if(!followers || followers.length === 0){
                        return res.status(200).json({followers : []});
                    }

                    getCustomUsers(followers, req.auth.id, (result)=>{
                        return res.status(200).json({followers : result});
                    })
                })

        })
        .catch(error => res.status(404).json({message: 'no registered user'}))

};
