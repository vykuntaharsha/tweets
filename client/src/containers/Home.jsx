import React, {Component} from 'react';
import TweetsList from './TweetsList';
import PostTweet from './PostTweet';
import ProfileBar from './ProfileBar';
import Footer from '../components/Footer';
import Trends from './Trends';
import {connect} from 'react-redux';
import {getTweets} from '../actions';

class Home extends Component{

    componentWillReceiveProps(nextProps){
        if(nextProps.isAuthenticated){
            this.props.dispatch(getTweets());
        }
    }

    componentDidMount(){
        if(this.props.isAuthenticated){
            this.props.dispatch(getTweets());
        }

    }

    render(){

        if(!this.props.isAuthenticated){
            return '';
        }
        return (
            <div className="row">
                <section className="col-sm-4 col-3 pt-2">
                    <ProfileBar />
                    <Trends/>
                    <Footer />
                </section>
                <main className="col-sm-8 col-9 pt-2">
                    <PostTweet />
                    <TweetsList />
                </main>

            </div>
        );
    }
}
const mapStateToProps = state => {
  const { authentication } = state;

  return {
    isAuthenticated : authentication.isAuthenticated
  }
}
export default connect(mapStateToProps)(Home);
