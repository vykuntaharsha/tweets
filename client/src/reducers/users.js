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

        case usersActions.UPDATE_FOLLOW:
            return handleFollow(state, action);

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

function handleFollow(state, action){
    const users = state.content;
    const content = users.map(user => {
        if(user._id === action.user._id){
            return action.user;
        }
        return user;
    });

    return {
        ...state,
        content
    };
}
