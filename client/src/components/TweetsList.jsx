import React from 'react';
import Tweet from './Tweet'
const TweetsList = ({tweets}){

    const tweetItems = tweets.map( (item, index) => {
        return <Tweet key={index} tweet={item}/>;
    });

    return (
        <ul className="tweets">
            {tweetItems}
        </ul>
    );
};

export default TweetsList;
