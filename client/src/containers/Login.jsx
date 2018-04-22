import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login, checkAuthentication} from '../actions/authentication';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Login extends Component {

    componentDidMount(){
        this.props.dispatch(checkAuthentication());
    }

    render(){
        let content;

        const {loginLoading, isAuthenticated, dispatch} = this.props;

        if(!isAuthenticated){

            content = (
                <button className="login-button"
                    onClick={() => dispatch(login())} >
                    <FontAwesomeIcon icon={['fab', 'twitter']} size="lg"/>
                     <span> Sign in with Twitter</span>
                </button>
            );

        }
        if(loginLoading){
            content = (
                <div className="login-loading">
                    <FontAwesomeIcon icon={['fas', 'spinner']} spin/>
                    <div>Waiting for authentication</div>
                </div>
            );
        }

        return (
            <div className="login-container">
                <div className="content-pane">
                    <ul className="content-details">
                        <li>
                            <FontAwesomeIcon icon={['fas', 'search']} size="lg"/>
                            <span> Follow your interests.</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={['fas', 'users']} size="lg"/>
                            <span> Hear what people are talking about.</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={['far', 'comment']} size="lg"/>
                            <span> Join the conversation.</span>
                        </li>
                    </ul>
                </div>
                <div className="login-pane">
                    {content}
                </div>
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
