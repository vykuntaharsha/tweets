import React, {Component} from 'react';
import Tweet from './Tweet';
import {likeTweet, displayProfile, shareOnTwitter} from '../actions';
import InfiniteScroll from 'react-infinite-scroller';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class TweetsList extends Component {

    constructor(){
        super();
        this.loadMoreTweets = this.loadMoreTweets.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleProfile = this.handleProfile.bind(this);
        this.handleShare = this.handleShare.bind(this);
    }

    handleProfile(tweet){
        this.props.dispatch(displayProfile(tweet.owner.screenName));
    }

    loadMoreTweets(){
        this.props.dispatch(this.props.loadMore());
    }

    handleLike(tweet){
        this.props.dispatch(likeTweet(tweet));
    }

    handleShare(tweet){
        this.props.dispatch(shareOnTwitter(tweet._id));
    }


    render(){
        if(!this.props.tweets) {
            return (
                <div className="row bg-white p-2 mb-2 mr-2 ml-1" style={{color: '#3aa1f2'}}>
                    <FontAwesomeIcon icon={['fas', 'spinner']} spin/>
                </div>
            );
        }

        const tweetItems = this.props.tweets.map( (item) => {
            return (
                <Tweet
                    key={item._id}
                    tweet={item}
                    like={()=>{ this.handleLike(item) }}
                    profile={()=>{this.handleProfile(item)}}
                    share={()=>{this.handleShare(item)}}
                />);
        });

        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadMoreTweets}
                hasMore={!!this.props.hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
                >
                {tweetItems}
            </InfiniteScroll>
        );

    }
}

export default TweetsList;
