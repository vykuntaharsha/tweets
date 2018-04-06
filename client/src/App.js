import React, { Component } from 'react';
import Login from './containers/Login';
import {connect} from 'react-redux';
import {checkAuthentication} from './actions/authentication'

class App extends Component {

    componentDidMount(){
        this.props.dispatch(checkAuthentication());
    }

    render() {
        let content = '';

        const {isAuthenticated, user} = this.props;

        if(isAuthenticated){
            content = (<p>{user.name}</p>);
        }

        return (
            <div>
                <Login />
                {content}
            </div>
        );
    }
}
const mapStateToProps = state => {
  const { authentication } = state

  return {
    isAuthenticated : authentication.isAuthenticated,
    user : authentication.user
  }
}

export default connect(mapStateToProps)(App);
