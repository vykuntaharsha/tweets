import React, {Component} from 'react';
import TweetsList from '../components/TweetsList';
import ProfileBar from '../components/ProfileBar';
import Footer from '../components/Footer';
import Trends from './Trends';
import {connect} from 'react-redux';
import {getTweetsOfHashtag} from '../actions';

class HashtagView extends Component{

    componentWillReceiveProps(nextProps){
        if(nextProps.tweets.page === 0){
            nextProps.dispatch(getTweetsOfHashtag());
        }
    }

    componentDidMount(){
        this.props.dispatch(getTweetsOfHashtag());

    }

    render(){
        const {tweets, hashtags, dispatch} = this.props;

        return (
            <div>
                <div
                    className="mx-2 p-5 text-center align-middle bg-primary text-white"
                    style={{fontSize : 40+'px'}}
                    >
                    #{hashtags.selectedTag}
                </div>
                <div className="row">

                    <section className="col-sm-4 col-3 pt-2">
                        <ProfileBar
                            user={this.props.user}
                            dispatch={dispatch}
                        />
                        <Trends/>
                        <Footer />
                    </section>
                    <main className="col-sm-8 col-9 pt-2">
                        <TweetsList
                            currentUser={this.props.user}
                            tweets={tweets.content}
                            hasMore={tweets.hasMore}
                            loadMore={getTweetsOfHashtag}
                            dispatch={dispatch}
                        />
                    </main>

                </div>
            </div>

        );
    }
}
const mapStateToProps = state => {
  const { authentication, hashtags, tweets } = state;

  return {
      user : authentication.user,
      hashtags,
      tweets
  }
}
export default connect(mapStateToProps)(HashtagView);
