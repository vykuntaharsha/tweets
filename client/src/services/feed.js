export const fetchFeed = (name, page=0) => {
    const url = `api/users/${name}/feed?page=${page}`;
    const token = localStorage.getItem('sessionToken');

    return fetch(url, {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization : `Bearer ${token}`
                },
            })
            .then(res => res.status === 200 ? res.json() : Promise.reject('cannot obtain feed'));
};
