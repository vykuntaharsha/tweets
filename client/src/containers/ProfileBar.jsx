import React from 'react';
import {connect} from 'react-redux';

const ProfileBar = ({isAuthenticated, user}) => {

    if(!isAuthenticated) return '';

    return (
        <div className="card">
            <a className="card-img-top">
                <img src={user.profileBackground} alt="profile background"/>
            </a>
            <div className="card-body">
                <a className="profile-img">
                    <img src={user.profilePicture} alt="profile picture"/>
                </a>
                <a className="profile-name">{user.name}</a>
                <a className="profile-screen-name">{user.screenName}</a>
                <ul className="profile-entities">
                    <li><a>Tweets</a><p>{user.tweetsCount}</p></li>
                    <li><a>Following</a><p>{user.followingCount}</p></li>
                    <li><a>Followers</a><p>{user.followersCount}</p></li>
                </ul>
            </div>
        </div>
    );
};

export default connect(
    (state) => {
        return {
            isAuthenticated : state.authentication.isAuthenticated,
            profile : state.profile
        };
    })(ProfileBar);
