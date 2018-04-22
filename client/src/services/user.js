export const fetchUser = (screenName) => {
    return fetch(`api/users/user/${screenName}`)
            .then(res => res.status === 200 ? res.json() : Promise.reject('canot get resource'));
};

export const fetchPopularUsers = (page=0) => {
    const token = localStorage.getItem('sessionToken');

    return fetch(`api/users/popular_users?page=${page}`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    .then(res => res.status === 200 ? res.json() : Promise.reject('couldnot get'));
};

export const fetchFolloweeSuggestions = (name, page=0) => {
    return fetch(`api/users/${name}/followee_suggestions?page=${page}`)
    .then(res => res.status === 200 ? res.json() : Promise.reject('couldnot get'));

};

export const postFollowUser = (name) =>{
    const token = localStorage.getItem('sessionToken');

    return fetch(`api/users/${name}/follow`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    .then(res => res.status === 200 ? res.json() : Promise.reject('couldnot post'));
};

export const fetchFollowers = (name, page=0) =>{
    const token = localStorage.getItem('sessionToken');

    return fetch(`api/users/${name}/followers?page=${page}`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    .then(res => res.status === 200 ? res.json() : Promise.reject('couldnot get'));
};


export const fetchFollowing = (name, page=0) =>{
    const token = localStorage.getItem('sessionToken');

    return fetch(`api/users/${name}/following?page=${page}`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    .then(res => res.status === 200 ? res.json() : Promise.reject('couldnot get'));
};
