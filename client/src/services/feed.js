export const fetchFeed = (user, page=0) => {
    const url = `api/users/${user.screenName}/feed?page=${page}`;
    const token = localStorage.getItem('sessionToken');

    return fetch(url, {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization : `Bearer ${token}`
                }
            })
            .then(res => res.status === 200 ? res.json() : Promise.reject('cannot obtain feed'));
};
