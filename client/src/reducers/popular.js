import {popularActions, followActions} from '../constants'

export const popular = (state={
    users : [],
    isFetching : false
}, action) => {
    switch (action.type) {
        case popularActions.REQUEST_USERS:

            return {
                ...state,
                isFetching : true,
                reset : false
            };
        case popularActions.RECEIVE_USERS:

            return {
                ...state,
                isFetching : false,
                users : action.users,
                reset : false
            };

        case popularActions.ERROR:
            return {
                ...state,
                isFetching : false,
                reset : false
            };
        case followActions.RESET_SUGGESTIONS:

            return {
                users : [],
                isFetching : false,
                reset : true
            };
        default:
            return state;
    }
};
