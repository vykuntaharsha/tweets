import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login, logout} from '../actions/authentication';

class Login extends Component {

    render(){
        let content;

        const {loginLoading, isAuthenticated, dispatch} = this.props;

        if(!isAuthenticated){

            content = (
                <button className="btn btn-primary"
                    onClick={() => dispatch(login())} >
                    <i class="fab fa-twitter"></i> sign in with twitter
                </button>
            );

        }
        if(loginLoading){
            content = (
                <div>
                    <i class="fas fa-spinner"></i>
                    <p>Waiting for authentication</p>
                </div>
            );
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
