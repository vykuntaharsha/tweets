export const fetchUser = (screenName) => {
    return fetch(`api/users/${screenName}`)
            .then(res => res.status === 200 ? res.json() : Promise.reject('canot get resource'));
}
