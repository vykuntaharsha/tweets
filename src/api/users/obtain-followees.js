const User = require('../../../models/user');
const getCustomUsers = require('./customise-users');

module.exports = (req, res)=>{
    if(!req.auth){
        return res.status(401).json({message : 'not authorized'});
    }

    const name = req.params.name;
    const perPage = req.query.limit || 5;
    const pageNo = req.query.page || 0;

    User.findOne({screenName : name})
        .select('followees')
        .lean()
        .exec()
        .then(doc=>{
            if(!doc || !doc.followees || doc.followees.length === 0){
                return res.status(200).json({followees : []});
            }

            const followeeDocs = doc.followees.slice(perPage * pageNo, perPage);

            if(followeeDocs.length === 0){
                return res.status(200).json({followees : []});
            }

            let done = 0;
            const followees = [];

            followeeDocs.forEach((item, index)=>{
                User.findById(item, (err, userDoc) => {
                    done += 1;

                    followees[index] = userDoc.toObject();

                    if(done === doc.followees.length){
                        getCustomUsers(followees, req.auth.id, (result)=>{
                            return res.status(200).json({followees : result});
                        });
                    }

                });
            });

        })
        .catch(error => res.status(404).json({message: 'no registered user'}));
};
