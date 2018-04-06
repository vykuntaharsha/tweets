import React , {Component} from 'react';

import {fetchRequestToken, postOAuthToken} from './services';

class Login extends Component {
    constructor(props) {
        super(props);
        this.requestedTwitter = false;

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick(e) {
        e.preventDefault();
        return this.getRequestToken();
    }

    getRequestToken() {
        const popup = this.openPopup();

        return fetchRequestToken()
                .then(data => {
                  popup.location = `https://api.twitter.com/oauth/authenticate?oauth_token=${data.oauth_token}`;
                  this.handleTwitterLogin( true );
                  this.polling(popup);
                })
                .catch(error => {
                  popup.close();
                  this.handleTwitterLogin(false);
                });
    }

    handleTwitterLogin( value ){
        this.requestedTwitter = value;
    }

    openPopup() {
        return window.open('', '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no');
    }

    polling(popup) {
    const polling = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(polling);
      }

      const closeDialog = () => {
        clearInterval(polling);
        popup.close();
      };

      try {
          if (popup.location.search) {
            const query = new URLSearchParams(popup.location.search);

            console.log(query);
            const oauthToken = query.get('oauth_token');
            const oauthVerifier = query.get('oauth_verifier');
            closeDialog();
            return this.sendOAuthToken(oauthVerifier, oauthToken);
          }
      } catch (error) {
          this.handleTwitterLogin(false);
          console.log(error);
      }

    }, 500);
  }

  sendOAuthToken(oAuthVerifier, oAuthToken) {
      return postOAuthToken( oAuthVerifier, oAuthToken )
                .then(res => res.json())
                .then(user => {this.props.authenticate(true, user)})
                .catch(error => this.handleTwitterLogin(false));
    }

    render() {
        if (this.requestedTwitter){
            return <p> waiting for sign in </p>;
        } else {
            return (
                <button onClick={this.onButtonClick}>
                    {this.props.text || 'sign in with twitter'}
                </button>
            );
        }
    }

}

export default Login;
