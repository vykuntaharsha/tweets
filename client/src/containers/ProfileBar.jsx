import React from 'react';
import {connect} from 'react-redux';
import {formatNumber} from '../util';

const ProfileBar = ({isAuthenticated, user}) => {

    if(!isAuthenticated) return '';
    return (
        <div className="row bg-white profile-bar ml-2">
            <div className="profile-background"></div>
            <img className="profile-picture" src={user.profilePicture} alt="profile"/>
            <div className="profile-tags mr-auto">
                <div className="profile-name">
                        <span>
                            {user.name}
                        </span>
                        {user.verified ? <i class="fas fa-check-circle"></i> : ''}
                </div>

                <div className="profile-screen-name">
                    @<span >
                        {user.screenName}
                    </span>
                </div>
            </div>
            <ul className="profile-entities m-auto">
                <li>Tweets<p>{formatNumber(user.tweetsCount)}</p></li>
                <li>Following<p>{formatNumber(user.followingCount)}</p></li>
                <li>Followers<p>{formatNumber(user.followersCount)}</p></li>
            </ul>
        </div>
    );
};
const mapStateToProps = state => {
  const { authentication } = state;

  return {
    isAuthenticated : authentication.isAuthenticated,
    user: authentication.user
  }
}
export default connect(mapStateToProps)(ProfileBar);
