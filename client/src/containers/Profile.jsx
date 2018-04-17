import React from 'react';
import TweetsList from '../components/TweetsList';
import ProfileBar from './ProfileBar';
import {connect} from 'react-redux';

const Profile = ({profile})=> {


    return(
        <div>
            <div>
                <img src={profile.profileBackground} alt="profile background"/>
            </div>
            <ProfileBar />
            <main>
                <TweetsList tweets={profile.tweets}/>
            </main>
        </div>
    );
};

export default connect(
    (state)=>{

    })(Profile);
