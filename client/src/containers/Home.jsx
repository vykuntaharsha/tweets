import React, {Component} from 'react';
import TweetsList from '../components/TweetsList';
import PostTweet from './PostTweet';
import ProfileBar from '../components/ProfileBar';
import Footer from '../components/Footer';
import FolloweeSuggestions from './FolloweeSuggestions';
import PopularUsers from './PopularUsers';
import Trends from './Trends';
import {connect} from 'react-redux';
import {getTweets} from '../actions';

class Home extends Component{

    componentWillReceiveProps(nextProps){
        if(nextProps.tweets.page === 0){
            nextProps.dispatch(getTweets());
        }
    }

    componentDidMount(){
        this.props.dispatch(getTweets());

    }

    render(){
        const {tweets, dispatch} = this.props;

        return (
            <div className="row">
                <section className="col-sm-4 col-3 pt-2">
                    <ProfileBar
                        user={this.props.user}
                        dispatch={dispatch}
                    />
                    <Trends/>
                    <FolloweeSuggestions/>
                    <PopularUsers/>
                    <Footer />
                </section>
                <main className="col-sm-8 col-9 pt-2">
                    <PostTweet />
                    {(tweets.page === 1 && tweets.content.length === 0) ?

                        <div className="text-center bg-white p-5 mr-2">
                            <h2>What? No Tweets yet?</h2>
                            This empty timeline won’t be around for long. Start following people and you’ll see Tweets show up here.
                        </div> :

                        <TweetsList
                            tweets={tweets.content}
                            hasMore={tweets.hasMore}
                            loadMore={getTweets}
                            dispatch={dispatch}
                        />
                    }
                </main>

            </div>
        );
    }
}
const mapStateToProps = state => {
  const { authentication, tweets } = state;

  return {
    user : authentication.user,
    tweets
  }
}
export default connect(mapStateToProps)(Home);
