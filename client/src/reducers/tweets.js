import {tweetsActions} from '../constants';


export const tweets = (state = {
    isFetching : false,
    content : [],
    page : 0
}, action) => {
    const previousTweets =  state.content || [];

    switch (action.type) {
        case  tweetsActions.REQUEST_TWEETS:
            return {
                ...state,
                isFetching : true
            };

        case tweetsActions.RECEIVE_TWEETS:

            return {
                ...state,
                isFetching : false,
                content : [...previousTweets, ...action.tweets],
                page : action.page + 1,
                hasMore : action.tweets.length !== 0
            };

        case tweetsActions.ERROR:
            return {
                ...state,
                isFetching : false
            };

        case tweetsActions.POSTING_TWEET:
            return {
                ...state,
                isFetching : true
            };

        case tweetsActions.UPDATE_TWEETS:
            return {
                ...state,
                isFetching : false,
                content  : [action.tweet, ...previousTweets]
            };
        case tweetsActions.UPDATE_LIKE:
            return handleLike(state, action);

        default:
            return state;

    }

};


function handleLike(state, action){
    const tweets = state.content;
    const content = tweets.map(tweet => {
        if(tweet._id === action.tweet._id){
            return action.tweet;
        }
        return tweet;
    });

    return {
        ...state,
        content
    };
}
