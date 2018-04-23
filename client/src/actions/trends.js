import {fetchTrends} from '../services';
import {trendsConstants} from '../constants';

export const getTrends = () => (dispatch, getState) => {
    const {isFetching} = getState().trends;

    if(isFetching) return;

    dispatch({type : trendsConstants.REQUEST_TRENDS});

    return fetchTrends()
            .then(trends => dispatch({
                type : trendsConstants.RECEIVE_TRENDS,
                hashtags : trends.hashtags
            }))
            .catch(error => dispatch({type : trendsConstants.TRENDS_ERROR}));

};
