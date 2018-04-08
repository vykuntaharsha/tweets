import React from 'react';
import {connect} from 'react-redux';

const Nav = ({isAuthenticated, user}) => {

    if(!isAuthenticated) return '';

    return (
        <nav className="navbar sticky-top nav-light bg-light">
            <ul className="navbar-nav">
                <li className="nav-item">Home</li>
                <li className="nav-item">Notifications</li>
                <li className="nav-item">Messages</li>
            </ul>
            <a className="navbar-brand" href="#">
                <i class="fab fa-twitter"></i>
            </a>
            <form className="form-inline my-2 my-lg-0">
                <div>
                    <input className="form-control mr-sm-2"
                        ref={node => input = node}
                        placeholder = "Search Tweets"
                    />
                    <span class="input-group-text" id="basic-addon1">
                        <i class="fas fa-search"></i>
                    </span>
                </div>
            </form>
            <div>
                <img className="nav-profile-img" src={user.profilePicture} alt="profile"/>
            </div>
            <button className="btn btn-primary">Tweet</button>
        </nav>

    );
};

export default connect(
    (state)=>{
        return {
            isAuthenticated : state.authentication.isAuthenticated,
            user : state.authentication.user
        };
    }
)(Nav);
