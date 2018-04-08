import React from 'react';
import TweetList from '../components/TweetList';

const Profile = ({profile})=> {


    return(
        <div>
            <div>
                <img src={profile.profileBackground} alt="profile background"/>
            </div>
            <ProfileBar />
            <Main>
                <TweetList {profile.tweets}/>
            </Main>
        </div>
    );
};

export default connect(
    (state)=>{

    })(Profile);
