export const fetchTrends = () =>{
    return fetch('api/hashtags/trending')
                .then(res => res.status === 200? res.json() : Promise.reject('cannot get'));
};
