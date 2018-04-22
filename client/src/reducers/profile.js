import {profileActions, auth} from '../constants';

export const profile = (state={
    user : {},
    display : profileActions.DISPLAY_TWEETS,
    isFetching : false
}, action)=>{

    switch (action.type) {
        case auth.LOGIN_SUCCESS:
            return {
                ...state,
                user : action.user
            };
        case profileActions.REQUEST_PROFILE:
            return {
                ...state,
                isFetching : true
            };

        case profileActions.RECEIVE_PROFILE:
            return {
                ...state,
                user : action.user,
                isFetching : false
            };
        case profileActions.DISPLAY_TWEETS:
            return {
                ...state,
                display : profileActions.DISPLAY_TWEETS
            };
        case profileActions.DISPLAY_FOLLOWERS:
            return {
                ...state,
                display : profileActions.DISPLAY_FOLLOWERS
            };
        case profileActions.DISPLAY_FOLLOWING:
            return {
                ...state,
                display : profileActions.DISPLAY_FOLLOWING
            };
        case profileActions.DISPLAY_LIKES:
            return {
                ...state,
                display : profileActions.DISPLAY_LIKES
            };
        case profileActions.ERROR:
            return {
                ...state,
                isFetching : false
            };

        default:
            return state;

    }
};
