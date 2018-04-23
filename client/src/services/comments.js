export const postComment = (tweetId, text) => {
    const token = localStorage.getItem('sessionToken');

    return fetch(`api/comments/tweet/${tweetId}`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({text})
    })
    .then(res => res.status === 200? res.json() : Promise.reject('couldnot post'))
};

export const postReply = (commentId, text) =>{
    const token = localStorage.getItem('sessionToken');

    return fetch(`api/comments/${commentId}/reply`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({text})
    })
    .then(res => res.status === 200? res.json() : Promise.reject('couldnot post'));
}

export const fetchComments = (tweetId, page=0)=>{
    return fetch(`api/comments/tweet/${tweetId}?page=${page}`)
            .then(res => res.status === 200? res.json() : Promise.reject('couldnot get'));
}

export const fetchReplies = (commentId, page=0)=>{
    return fetch(`api/comments/${commentId}/replies?page=${page}`)
            .then(res => res.status === 200? res.json() : Promise.reject('couldnot get'));
}
