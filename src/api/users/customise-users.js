const User = require('../../../models/user');


const getCustomUser = (followee, userId, callback)=>{

    if(followee==userId){
        return callback(null);
    }
    User.findOne({_id :userId, followees : followee}, (err, doc)=>{
        if(doc){
            return callback(true);
        }
        return callback(false);
    })
}

module.exports = (docs, userId, callback) => {
    let done = 0;
    const users = [];

    docs.forEach((item, index) => {
        getCustomUser(item._id, userId, (flag)=>{
            done += 1;

            const user = {
                ...item,
                isFollowingByUser : flag
            }

            users[index]=user;

            if(done === docs.length){
                return callback(users);
            }
        })
    })
}
