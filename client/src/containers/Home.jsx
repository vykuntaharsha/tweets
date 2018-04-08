import React, {Component} from 'react';
import TweetList from '../components/TweetList';
import PostTweet from '../components/PostTweet';
import ProfileBar from './ProfileBar';

class Home extends Component{



    render(){

        return (
            <div>
                <ProfileBar />
                <Main>
                    <PostTweet />
                    <TweetList tweets={}/>
                </Main>
            </div>
        );
    }
}

export default connect(
    (state) => {

    })(Home);
