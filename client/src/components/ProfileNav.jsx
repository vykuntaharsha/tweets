import React from 'react'
import {
    displayProfileTweets,
    displayProfileFollowing,
    displayProfileFollowers,
    displayProfileLikedTweets,
    followUser,
    unfollowUser,
} from '../actions';

import {profileActions} from '../constants';

const ProfileNav = ({user, dispatch, view})=>{
    if(!user){
        return '';
    }

    const active = []

    switch (view) {
        case profileActions.DISPLAY_TWEETS:
            active[0] = 'active';
            break;
        case profileActions.DISPLAY_FOLLOWERS:
            active[1] = 'active';
            break;
        case profileActions.DISPLAY_FOLLOWING:
            active[2] = 'active';
            break;
        case profileActions.DISPLAY_LIKES:
            active[3] = 'active';
            break;
        default:
            break;

    }

    const renderFollowButton = () => {
        if(user.isFollowingByUser === null){
            return '';
        }

        if(!user.isFollowingByUser){
            return (
                <button className="btn btn-outline-primary follow-btn ml-auto"
                    onClick={()=>{dispatch(followUser(user.screenName, true))}}>
                    Follow
                </button>
            );
        }

        return (
            <button className="btn btn-primary follow-btn ml-auto"
                onClick={()=>{dispatch(unfollowUser(user.screenName, true))}}>
                Unfollow
            </button>
        );
    };

    return (
        <div className="row ml-2 mr-2">
            <div className="col-12">
                <img
                    className="profile-nav-background"
                    src={user.profileBackground}
                    alt="profile background"
                />
                <div className="col-12 m-auto bg-white">
                    <ul className="col-8 nav nav-tabs bg-white pt-2 pb-1 ml-auto pl-2">
                         <li className="nav-item">
                              <a
                                  className={"nav-link "+ active[0] || ''}
                                  onClick={()=>{dispatch(displayProfileTweets())}}
                                  >
                                Tweets
                            </a>
                         </li>
                         <li className="nav-item">
                             <a
                                 className={"nav-link "+ active[1] || ''}
                                 onClick={()=>{dispatch(displayProfileFollowers())}}
                                 >
                                 Followers
                             </a>
                         </li>
                         <li className="nav-item">
                             <a
                                 className={"nav-link "+ active[2] || ''}
                                 onClick={()=>{dispatch(displayProfileFollowing())}}
                                 >
                                 Following
                             </a>
                         </li>
                         <li className="nav-item">
                             <a
                                 className={"nav-link "+ active[3] || ''}
                                 onClick={()=>{dispatch(displayProfileLikedTweets())}}
                                 >
                                Likes
                            </a>
                         </li>

                         {renderFollowButton()}

                    </ul>

                </div>
            </div>
        </div>

    );
}

export default ProfileNav;
