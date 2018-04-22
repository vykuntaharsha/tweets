import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {displayProfile, followUser} from '../actions';

const UserBar = ({user, dispatch})=>{

    return (
        <div className="row mt-2 items pb-2">
            <div className="col-1">
                <img
                    className="profile-img rounded-circle float-left"
                    src={user.profilePicture}
                    alt="profile"
                    style={{width : 36+'px'}}
                />
            </div>
            <div className="profile-tags col-10 ml-auto pt-1">
                <div className="ml-2 text-right">
                    <span
                        className="profile-name item-name"
                        onClick={()=>{dispatch(displayProfile(user.screenName))}}
                        >
                        {user.name}

                        <span>{user.verified ? <FontAwesomeIcon icon={['fas', 'check-circle']}/> : ''}</span>

                        <span className="profile-screen-name item-screen-name">
                            @{user.screenName}
                        </span>
                    </span>
                </div>

                <div className="text-right">
                    <button
                        className="btn btn-outline-primary follow-btn"
                        onClick={()=>dispatch(followUser(user.screenName))}
                        >
                        <small>Follow</small>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserBar;
