import {postFollowUser} from '../services';
import {followActions, auth} from '../constants';

export const followUser = (name)=>dispatch=>{

    return postFollowUser(name)
            .then(data => {
                dispatch({type : auth.UPDATE_USER, user : data.user});
                dispatch({type : followActions.RESET_SUGGESTIONS});
            })
            .catch(error => dispatch({type : followActions.ERROR}));

};
