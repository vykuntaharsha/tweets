import React from 'react';
import Login from './containers/Login';
import Nav from './components/Nav';
import Home from './containers/Home';
import {connect} from 'react-redux';
import Profile from './containers/Profile';
import {display} from './constants';
import Alert from './containers/Alert';

import './App.css';
//font awesome icons
import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'

fontawesome.library.add(brands, solid, regular);


const App =  ({isAuthenticated, view}) => {

    if(!isAuthenticated){
        return <Login />;
    }
    const renderContent = ()=>{
        switch (view) {
            case display.HOME:
                return <Home/>;
            case display.PROFILE:
                return <Profile/>;
            default:
                return <Home/>;

        }
    }
    return (
        <div>
            <Nav />
            <Alert/>
            <div className="row">
                <div className="col-lg-9 col-12 m-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state)=>{
    const {authentication, display} = state;
    return {
        isAuthenticated : authentication.isAuthenticated,
        view : display
    };
}

export default connect(mapStateToProps)(App);
