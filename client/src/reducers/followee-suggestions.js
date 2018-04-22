import {followeeSuggestionsActions, followActions} from '../constants';

export const followeeSuggestions = (state = {
    suggestions : [],
    isFetching : false
}, action) => {
    switch (action.type) {
        case followeeSuggestionsActions.REQUEST_SUGGESTIONS:
            return {
                ...state,
                isFetching : true,
                reset : false
            };

        case followeeSuggestionsActions.RECEIVE_SUGGESTIONS:
            return {
                ...state,
                isFetching : false,
                suggestions : action.users,
                reset : false
            };

        case followeeSuggestionsActions.ERROR:
            return {
                ...state,
                isFetching : false,
                reset : false
            };
        case followActions.RESET_SUGGESTIONS:

            return {
                suggestions : [],
                isFetching : false,
                reset : true
            };
        default:
            return state;
    }
};
