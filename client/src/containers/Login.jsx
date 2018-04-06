import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login, logout} from '../actions/authentication';

class Login extends Component {


    render(){
        let content;

        const {loginLoading, isAuthenticated, dispatch} = this.props;

        if(!isAuthenticated){

            content = (<button onClick={() => dispatch(login())}>sign in with twitter</button>);

        }
        if (isAuthenticated) {
            content = (<button onClick={() => dispatch(logout())}>sign out</button>);
        }
        if(loginLoading){
            content = (<span> waiting for login </span>);
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => {
  const { authentication } = state;

  return {
    isAuthenticated : authentication.isAuthenticated,
    loginLoading: authentication.loginLoading
  }
}


export default connect(mapStateToProps)(Login);
