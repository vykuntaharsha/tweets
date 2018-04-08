import React, { Component } from 'react';
import Login from './containers/Login';
import Nav from './components/Nav';
import Home from './containers/Home';
import Profile from './containers/Profile';
import FollowSuggestions from './containers/FollowSuggestions';
import Trends from './containers/Trends';
import Footer from './components/Footer';

const App =  () => {

    return (
        <div>
            <Login />
            <Nav />
            <Trends />
            <Home />
            <Profile />
            <FollowSuggestions />
            <Footer/>
        </div>
    );
};

export default App;
