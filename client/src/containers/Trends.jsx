import React from 'react';
import {connect} from 'react-redux';


const Trends = ({isAuthenticated, trends}) => {

    if(!isAuthenticated) return '';

    const trendItems = trends.map( (item, index) => {
        return (
            <li key={index}>
                <a className="trend-hash-tag">{item.hastag}</a>
                <span >{item.noOfTweets} Tweets</span>
            </li>
        );
    });

    return (
        <div className="trends">
            <ul>
                Trends for you
                {trendItems}
            </ul>
        </div>
    );
};

export default connect(
    (state) => {
        return {
            isAuthenticated : state.authentication.isAuthenticated,
            trends : state.trends
        }
    })(Trends);
