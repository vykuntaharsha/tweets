import {usersActions} from '../constants';

export const users = (state ={
    isFetching : false,
    content : [],
    page : 0
}, action) => {
    const previousUsers = state.content || [];

    switch (action.type) {
        case usersActions.REQUEST_USERS:

            return {
                ...state,
                isFetching : true
            };

        case usersActions.RECEIVE_USERS:

            return {
                ...state,
                isFetching : false,
                content : [...previousUsers, ...action.users],
                page : action.page + 1,
                hasMore : action.users.length !== 0
            };

        case usersActions.ERROR:

            return{
                ...state,
                isFetching : false
            };

        case usersActions.RESET:
            return {
                isFetching : false,
                content : [],
                page : 0
            };
        
        default:
            return state;
    }

};
