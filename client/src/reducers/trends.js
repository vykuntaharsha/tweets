import {trendsConstants} from '../constants';

export const trends = (state = {
    hashtags : [],
    isFetching : false
}, action)=>{

    switch (action.type) {

        case trendsConstants.REQUEST_TRENDS:
            return {
                ...state,
                isFetching : true
            };
        case trendsConstants.RECEIVE_TRENDS:
            return {
                ...state,
                isFetching : false,
                hashtags : [...action.hashtags]
            };

        case trendsConstants.TRENDS_ERROR:
            return {
                ...state,
                isFetching : false
            };
        default:
            return state;
    }
};
