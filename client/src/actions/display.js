import {
    display,
    profileActions,
    tweetsActions,
    usersActions,
    hashtagsActions
} from '../constants';
import {fetchUser} from '../services';
import {getTweetsOfProfile} from './tweets';

export const displayHome = () =>(dispatch)=>{
    dispatch({type : display.HOME});
    dispatch({type : tweetsActions.RESET});
    dispatch({type : profileActions.RESET_DISPLAY});
};

export const displayProfile = (name) => (dispatch, getState) =>{
    dispatch({type : display.PROFILE});
    dispatch({type : tweetsActions.RESET});
    dispatch({type : usersActions.RESET});

    const {profile} = getState();

    if(profile && profile.isFetching) return ;

    dispatch({type : profileActions.REQUEST_PROFILE})

    return fetchUser(name)
            .then(data =>{
                dispatch({type : profileActions.RECEIVE_PROFILE, user : data.user});
                dispatch({type : profileActions.DISPLAY_TWEETS});
                dispatch(getTweetsOfProfile())
            })
            .catch(error => {
                dispatch({type : profileActions.PROFILE_ERROR});
                dispatch({type : display.HOME});
            });

};

export const displayHashtags = (tag) => (dispatch) => {
    dispatch({type : display.HASHTAGS});
    dispatch({type : tweetsActions.RESET});
    dispatch({type : hashtagsActions.SET_HASHTAG, tag})
};
