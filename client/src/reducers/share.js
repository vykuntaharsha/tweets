import {shareActions} from '../constants';

export const share = (state ={
    isRequested : false,
    url : null,
    error : false
}, action) => {
    switch (action.type) {
        case shareActions.REQUEST:
            return {
                isRequested : true,
                url : null,
                error : false
            };

        case shareActions.RECEIVE_RESPONSE:
            return {
                isRequested :false,
                url : action.url,
                error : false
            };
        case shareActions.ERROR:

            return {
                ...state,
                isRequested :false,
                error : true
            };
        case shareActions.RESET_POPUP:
            return {
                isRequested : false,
                url : null,
                error : false    
            };
        default:
            return state;

    }
};
