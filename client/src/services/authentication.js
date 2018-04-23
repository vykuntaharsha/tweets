export const login = (oAuthVerifier, oAuthToken) => {
    const url = `api/auth/login?oauth_verifier=${oAuthVerifier}&oauth_token=${oAuthToken}`;

    return fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then( res => res.status === 200 ? res.json() : Promise.reject('could not login at this time'));
};

export const logout = () => {
    const token = localStorage.getItem('sessionToken');
    return fetch('api/auth/logout', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    .then(res => res.status === 200 ? Promise.resolve(true) : Promise.reject('could not connect to server'));
};

export const checkAuthentication = () => {
    const token = localStorage.getItem('sessionToken');

    return fetch('api/auth/authenticate', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    .then(res => {
        if(res.status === 200) return res.json();
        if(res.status === 400) return Promise.resolve(false);
        return Promise.reject('could not check authentication at this time');
    });
};

export const requestTokenForTwitter = () => {
    return fetch('api/auth/request_token', {
        method : 'POST'
    })
    .then(res => res.status === 302 ? res.json() : Promise.reject('could not get token from server'));
};
