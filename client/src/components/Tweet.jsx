import React from 'react';

const Tweet = ({tweet})=>{

    return (
        <div className="row card">
            <div className="col-1">
                <img src={tweet.user.profilePicture} alt="profile picture"/>
            </div>
            <div className="col-11">
                <a>
                    {tweet.user.name} {tweet.user.verified ? <i class="fas fa-badge-check"></i> : ''} @{tweet.user.screenName}
                </a> . {tweet.updatedAt}
                <p>{tweet.text}</p>
                <div>
                    {tweet.image ? <img src={tweet.image} alt="tweet media"/> : ''}
                </div>
                <div>
                    <span><i class="far fa-comment-alt"></i>{tweet.replyCount} </span>
                    <span><i class="fas fa-retweet"></i>{tweet.retweetCount}</span>
                    <span><i class="far fa-heart"></i>{tweet.favouriteCount}</span>
                </div>
            </div>
        </div>
    );
};

export default Tweet;
