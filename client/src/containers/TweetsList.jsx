import React, {Component} from 'react';
import Tweet from '../components/Tweet';
import {connect} from 'react-redux';
import {getTweets, likeTweet} from '../actions';
import InfiniteScroll from 'react-infinite-scroller';

class TweetsList extends Component {

    constructor(){
        super();
        this.loadMoreTweets = this.loadMoreTweets.bind(this);
        this.handleLike = this.handleLike.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.props = nextProps;
    }

    loadMoreTweets(){
        this.props.dispatch(getTweets());
    }

    handleLike(tweet){
        this.props.dispatch(likeTweet(tweet));
    }

    render(){
        if(!this.props.tweets) {
            return '';
        }

        const tweetItems = this.props.tweets.map( (item, index) => {
            return (
                <Tweet
                    key={index}
                    tweet={item}
                    like={()=>{ this.handleLike(item) }}
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

const mapStateToProps = (state) => {
    const {tweets} = state;

    return {
        tweets : tweets ? tweets.content : [],
        hasMore : tweets.hasMore
    };
};
export default connect(mapStateToProps)(TweetsList);
