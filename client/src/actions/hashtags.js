import {tweetsActions} from '../constants';
import {fetchTweetsOfHashtag} from '../services';


export const getTweetsOfHashtag = () => (dispatch, getState) => {

    const {tweets, hashtags} = getState();

    if(tweets.isFetching) return;

    dispatch({type: tweetsActions.REQUEST_TWEETS});

    const page = tweets.page;
    return fetchTweetsOfHashtag(hashtags.selectedTag, page)
            .then(tweets => dispatch({type : tweetsActions.RECEIVE_TWEETS, tweets, page}))
            .catch(error => dispatch({type : tweetsActions.ERROR}));

};
