import {usersActions} from '../constants';
import {fetchFollowers, fetchFollowing} from '../services';

export const getFollowers = () => (dispatch, getState) => {

    const {users, profile} = getState();

    if(users.isFetching) return ;

    dispatch({type: usersActions.REQUEST_USERS});
    const page = users.page;

    return fetchFollowers(profile.user.screenName, page)
            .then(data => dispatch({type : usersActions.RECEIVE_USERS, users : data.followers, page}))
            .catch(err => dispatch({type : usersActions.ERROR}));

};

export const getFollowees = () => (dispatch, getState) => {

    const {users, profile} = getState();

    if(users.isFetching) return ;

    dispatch({type: usersActions.REQUEST_USERS});
    const page = users.page;

    return fetchFollowing(profile.user.screenName, page)
            .then(data => dispatch({type : usersActions.RECEIVE_USERS, users : data.followees, page}))
            .catch(err => dispatch({type : usersActions.ERROR}));

};
