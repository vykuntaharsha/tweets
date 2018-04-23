import {
    profileActions,
    tweetsActions,
    display,
    usersActions
} from '../constants';
import {getTweetsOfProfile, getLikedTweetsOfProfile} from './tweets';
import {getFollowees, getFollowers} from './users';

export const displayProfileTweets = () => (dispatch)=>{
    dispatch({type : display.PROFILE});
    dispatch({type : tweetsActions.RESET});
    dispatch({type : profileActions.DISPLAY_TWEETS });
    dispatch(getTweetsOfProfile());
};

export const displayProfileFollowing = () => (dispatch)=> {
    dispatch({type : display.PROFILE});
    dispatch({type : usersActions.RESET});
    dispatch({type : profileActions.DISPLAY_FOLLOWING});
    dispatch(getFollowees());
};

export const displayProfileFollowers = () => (dispatch)=> {
    dispatch({type : display.PROFILE});
    dispatch({type : usersActions.RESET});
    dispatch({type : profileActions.DISPLAY_FOLLOWERS});
    dispatch(getFollowers());
};

export const displayProfileLikedTweets = () => (dispatch) =>{
    dispatch({type : display.PROFILE});
    dispatch({type : tweetsActions.RESET});
    dispatch({type : profileActions.DISPLAY_LIKES});
    dispatch(getLikedTweetsOfProfile());
};
