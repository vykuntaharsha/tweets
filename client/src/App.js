import React from 'react';
import Login from './containers/Login';
import Nav from './components/Nav';
import Home from './containers/Home';
import './App.css';
//font awesome icons
import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'

fontawesome.library.add(brands, solid, regular);

// import Profile from './containers/Profile';
// import FollowSuggestions from './containers/FollowSuggestions';
//import Trends from './containers/Trends';

const App =  () => {

    return (
        <div>
            <Nav />
            <div className="row">
                <div className="col-lg-9 col-12 m-auto">
                    <Login />
                    <Home />
                </div>
            </div>

            {/* <Trends />

            <Profile />
            <FollowSuggestions /> */}
        </div>
    );
};

export default App;
