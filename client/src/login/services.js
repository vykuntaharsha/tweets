export const fetchRequestToken = () => {
    return fetch('api/auth/request_token', {
              method: 'POST',
              'Content-Type' : 'application/json'
            })
            .then(res => res.json())
            .catch( () => Promise.reject('fetch-request-token-fail'));
};

export const postOAuthToken = (oAuthVerifier, oAuthToken) => {
    const url = `api/auth/login?oauth_verifier=${oAuthVerifier}&oauth_token=${oAuthToken}`;

    return fetch(url, {
            method : 'POST',
            'Content-Type' : 'application/json'
            });
};

export const sendOAuthTokenToTwitter = (oAuthToken) => {
    const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${oAuthToken}`;

    return fetch(url);
}
