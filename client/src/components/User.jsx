import React from 'react';
import {displayProfile} from '../actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const User = ({user, dispatch}) => {
    if(!user) return '';

    const renderProfileView = () =>{
        dispatch(displayProfile(user.screenName));
    };

    const renderFollowButton = () => {
        if(user.isFollowingByUser === null){
            return '';
        }

        if(!user.isFollowingByUser){
            return (
                <button className="btn btn-outline-primary follow-btn mt-2">
                    Follow
                </button>
            );
        }

        return (
            <button className="btn btn-primary follow-btn mt-2">
                Unfollow
            </button>
        );
    };

    return (
        <div className="col-lg-3 col-5 card mx-2" >
            <div className="mx-auto mt-3">
                <img
                    className="card-img-top rounded-circle user-img profile-img" src={user.profilePicture} alt="profile"
                />
            </div>
                {renderFollowButton()}
            <div className="profile-tags text-center mx-auto mt-4 mb-3">
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
        </div>
    );
};

export default User;
