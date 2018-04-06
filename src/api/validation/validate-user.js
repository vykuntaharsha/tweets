
function isValidUser(user) {
    if(!user.name) return false;

    if(!user.name.match( /^[a-zA-Z0-9]+$/ )) return false;

    if(user.screenName && !user.screenName.match( /^[a-zA-Z0-9]+$/ )) return false;

    if(user.description && !user.description.match( /^[ A-Za-z0-9.,!]*$/ )) return false;

    if(user.location && !user.location.match( /^[ A-Za-z0-9.,!]*$/ )) return false;

    return true;
}


module.exports = isValidUser;
