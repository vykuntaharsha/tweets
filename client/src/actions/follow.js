import {postFollowUser, unfollow} from '../services';
import {followActions, auth, profileActions} from '../constants';
import {displayProfileFollowing, displayProfileFollowers} from './profile';
import {displayProfile} from './display';

export const followUser = (name, nav=false)=>(dispatch, getState)=>{

    const {display, user} = getState().profile;
    return postFollowUser(name)
            .then(data => {
                dispatch({type : auth.UPDATE_USER, user : data.user});
                dispatch({type : followActions.RESET_SUGGESTIONS});

                if(data.user._id === user._id ){
                    dispatch({type: profileActions.UPDATE_PROFILE, user : data.user})
                }

                if(nav){
                    dispatch(displayProfile(name));
                }

                if(profileActions.DISPLAY_FOLLOWING === display){
                    dispatch(displayProfileFollowing());
                }else if (profileActions.DISPLAY_FOLLOWERS === display) {
                    dispatch(displayProfileFollowers());
                }

            })
            .catch(error => dispatch({type : followActions.ERROR}));

};

export const unfollowUser = (name, nav=false) => (dispatch, getState) =>{
    const {display, user} = getState().profile;
    return unfollow(name)
            .then(data => {
                dispatch({type : auth.UPDATE_USER, user : data.user});
                dispatch({type : followActions.RESET_SUGGESTIONS});

                if(data.user._id === user._id){
                    dispatch({type: profileActions.UPDATE_PROFILE, user : data.user})
                }

                if(nav){
                    dispatch(displayProfile(name));
                }

                if(profileActions.DISPLAY_FOLLOWING === display){
                    dispatch(displayProfileFollowing());
                }else if (profileActions.DISPLAY_FOLLOWERS === display) {
                    dispatch(displayProfileFollowers());
                }

            })
            .catch(error => dispatch({type : followActions.ERROR}));

};
