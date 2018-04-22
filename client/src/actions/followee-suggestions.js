import {followeeSuggestionsActions} from '../constants';
import {fetchFolloweeSuggestions} from '../services';



export const getFolloweeSuggestions = ()=> (dispatch, getState) => {

    const {followeeSuggestions, authentication} = getState();

    if(followeeSuggestions.isFetching) return ;

    dispatch({type: followeeSuggestionsActions.REQUEST_SUGGESTIONS})

    return fetchFolloweeSuggestions(authentication.user.screenName)
                .then(users => dispatch({type: followeeSuggestionsActions.RECEIVE_SUGGESTIONS, users})
                )
                .catch(error => dispatch({type: followeeSuggestionsActions.ERROR}));
};
