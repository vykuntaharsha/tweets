import React from 'react';
import {formatNumber} from '../util';
import {
    displayProfile,
    displayProfileTweets,
    displayProfileFollowing,
    displayProfileFollowers
} from '../actions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const ProfileBar = ({user, dispatch}) => {

    const renderProfileView = () =>{
        dispatch(displayProfile(user.screenName));
    }

    if(!user) return '';
    return (
        <div className="row bg-white profile-bar ml-2">
            <div className="profile-background"></div>
            <img
                className="profile-picture profile-img" src={user.profilePicture} alt="profile"
                onClick={renderProfileView}
            />
            <div className="profile-tags mr-auto">
                <div className="profile-name">
                        <span onClick={renderProfileView}>
                            {user.name}
                        </span>
                        {user.verified ? <FontAwesomeIcon icon={['fas', 'check-circle']}/> : ''}
                </div>

                <div className="profile-screen-name">
                    @<span onClick={renderProfileView}>
                        {user.screenName}
                    </span>
                </div>
            </div>
            <ul className="profile-entities m-auto">
                <li onClick={()=>{dispatch(displayProfileTweets())}}
                    >
                    Tweets<p>{formatNumber(user.tweetsCount)}</p>
                </li>
                <li onClick={()=>{dispatch(displayProfileFollowers())}}
                    >
                    Followers<p>{formatNumber(user.followersCount)}</p>
                </li>
                <li onClick={()=>{dispatch(displayProfileFollowing())}}
                    >
                    Following<p>{formatNumber(user.followingCount)}</p>
                </li>
            </ul>
        </div>
    );
};

export default ProfileBar;
