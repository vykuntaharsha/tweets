export const postTweetToServer = (text)=>{

    const token = localStorage.getItem('sessionToken');

    return fetch('api/tweets/tweet', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({tweet : {text} })
    })
    .then(res => res.status === 200 ? res.json() : Promise.reject('couldnot post'));

};

export const postLike = (tweet)=>{
    const url = `api/tweets/${tweet._id}/like`
    const token = localStorage.getItem('sessionToken');
    return fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    .then(res => res.status === 200 ? res.json() : Promise.reject('couldnot post'));
}
