import {fetchPopularUsers} from '../services';
import {popularActions} from '../constants';

export const getPopularUsers = () => (dispatch, getState) => {
    const {popular} = getState();

    if(popular.isFetching) return;
    dispatch({type: popularActions.REQUEST_USERS})

    return fetchPopularUsers()
                .then(users => dispatch({type: popularActions.RECEIVE_USERS, users}))
                .catch(error => dispatch({type: popularActions.ERROR}));

};
