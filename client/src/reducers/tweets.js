import {tweetsActions} from '../constants';


export const tweets = (state = {
    isFetching : false,
    content : [],
    page : 0,
    hasMore : true
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
                content : getContent(previousTweets, action.tweets),
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
                content  : getContent(previousTweets, [action.tweet], true)
            };
        case tweetsActions.UPDATE_LIKE:
            return handleLike(state, action);

        case tweetsActions.RESET:
            return {
                isFetching : false,
                content : [],
                page : 0,
                hasMore : true
            };
        case tweetsActions.DELETE_TWEET:

            return getDeleteState(state, action);
        default:
            return state;

    }

};

function getContent( prev, next, front=false) {
    const nextIds = next.map(item => item._id);

    const previous = prev.filter(item => !nextIds.includes(item._id))
    if(front){
        return [...next, ...previous];
    }
    return [...previous, ...next];
}

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

function getDeleteState(state, action) {
    const tweets = state.content;

    const content = tweets.filter(item => item._id !==action.tweetId);

    return {
        ...state,
        content : [...content]
    };
}
