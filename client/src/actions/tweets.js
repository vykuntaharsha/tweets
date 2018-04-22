import { tweetsActions } from '../constants';
import { auth } from '../constants';

import {
    fetchFeed,
    postTweetToServer,
    fetchUser,
    postLike,
    fetchTweetsOfUser
} from '../services';

export const getTweets = () => (dispatch, getState) => {
    const {authentication, tweets} = getState();
    const user = authentication.user;


    if(tweets.isFetching) return;
    dispatch({type: tweetsActions.REQUEST_TWEETS})

    const page = tweets.page;

    return fetchFeed(user.screenName, page)
                .then(tweets => dispatch({type: tweetsActions.RECEIVE_TWEETS, tweets, page}))
                .catch(error => dispatch({type: tweetsActions.ERROR}));

};


export const postTweet = (text) => (dispatch, getState) => {
    dispatch({type : tweetsActions.POSTING_TWEET});

    return postTweetToServer(text)
        .then(data => {
            dispatch({type : tweetsActions.UPDATE_TWEETS, tweet : data.tweet });
            const {user} = getState().authentication;
            return fetchUser(user.screenName);
        })
        .then(data => dispatch({type : auth.UPDATE_USER, user : data.user}))
        .catch(error => dispatch({type: tweetsActions.ERROR}));
};

export const likeTweet = (tweet) => (dispatch) => {

    return postLike(tweet)
            .then(data=> dispatch({type : tweetsActions.UPDATE_LIKE, tweet: data.tweet }))
            .catch(error => dispatch({type: tweetsActions.ERROR}));
};

export const getTweetsOfProfile = (liked=false) => (dispatch, getState) =>{
    const {tweets, profile} = getState();

    if(tweets.isFetching || profile.isFetching) return;

    dispatch({type: tweetsActions.REQUEST_TWEETS})

    const page = tweets.page;
    return fetchTweetsOfUser(profile.user.screenName, page, liked)
                .then(tweets => dispatch({type: tweetsActions.RECEIVE_TWEETS, tweets, page}))
                .catch(error => dispatch({type: tweetsActions.ERROR}));
};

export const resetTweets = () => ({
    type : tweetsActions.RESET
})

export const getLikedTweetsOfProfile = () => {
    return getTweetsOfProfile(true);
};
