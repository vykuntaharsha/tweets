import { auth } from '../constants';
import * as services from '../services/authentication';

export const login = () => dispatch => {
    dispatch({type : auth.LOGIN_REQUEST});

    return services.requetTokenForTwitter()
        .then( tokenData => Promise.resolve(tokenData.oauth_token))
        .then( oAuthToken => {
            signInOnTwitter(oAuthToken, (oAuthData, error) => {
                if( error || !oAuthData ) return dispatch({ type : auth.LOGIN_FAILURE });

                services.login(oAuthData.oAuthVerifier, oAuthData.oAuthToken)
                .then( data => {
                    localStorage.setItem('sessionToken', data.token);
                    dispatch({ type : auth.LOGIN_SUCCESS, user : data.user });
                })
                .catch( error => {
                    dispatch({ type : auth.LOGIN_FAILURE });
                });
            });
        });

};

export const logout = () => dispatch => {

    return services.logout()
        .then(status => {
            if(status){
                dispatch({ type : auth.LOGOUT });
            }
        })
        .catch( error => dispatch({ type : auth.INVALID_REQUEST }));

};

export const checkAuthentication = () => dispatch => {
    dispatch({type: auth.LOGIN_REQUEST});
    return services.checkAuthentication()
        .then( data => {
            if(data){
                dispatch({type : auth.LOGIN_SUCCESS, user: data.user});
            }else {
                dispatch({type : auth.LOGIN_FAILURE})
            }
        })
        .catch( error => dispatch({ type : auth.INVALID_REQUEST }));
};

const signInOnTwitter = (oAuthToken, callback) => {
    const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${oAuthToken}`;
    const popup = window.open('', '');
    try {
        popup.location = url;
    } catch (e) {
        return callback(null, new Error('popup-blocked'));
    }

    getLoginStatus(popup, (tokenData) => {
        return callback(tokenData);
    });
};

const getLoginStatus = (popup, callback) => {
    const polling = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
          callback(null, new Error('popup-closed'));
          clearInterval(polling);
      }

      const closeDialog = () => {
          clearInterval(polling);
          popup.close();
      };

      try {
          if (popup.location.search) {
              const query = new URLSearchParams(popup.location.search);
              const oAuthToken = query.get('oauth_token');
              const oAuthVerifier = query.get('oauth_verifier');
              closeDialog();
              return callback({oAuthVerifier, oAuthToken}, null);
          }
      } catch (error) {

      }

    }, 500);
};
