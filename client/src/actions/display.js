import {
    display,
    profileActions,
    tweetsActions,
    usersActions
} from '../constants';
import {fetchUser} from '../services';

export const displayHome = () =>(dispatch)=>{
    dispatch({type : display.HOME});
    dispatch({type : tweetsActions.RESET});
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
                dispatch({type : profileActions.RECEIVE_PROFILE, user : data.user})
                dispatch({type : profileActions.DISPLAY_TWEETS})
            })
            .catch(error => {
                dispatch({type : profileActions.PROFILE_ERROR});
                dispatch({type : display.HOME});
            });

}
