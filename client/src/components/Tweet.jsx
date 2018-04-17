import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {getTimeElapsed} from '../util/time';

const Tweet = ({tweet, like})=>{

    const displayLike = ()=>{
        if(tweet.isLikedByUser){
            return <FontAwesomeIcon icon={['fas', 'heart']} className="liked"/>;
        }
        return  <FontAwesomeIcon icon={['far', 'heart']}/>;
    }
    return (
        <div className="row bg-white p-2 mb-2 mr-2 ml-1">
            <div className="col-lg-1 col-2">
                <img className="rounded-circle" src={tweet.owner.profilePicture} alt="profile"/>
            </div>
            <div className="col-lg-11 col-10">
                <a>
                    <span className="profile-name">{tweet.owner.name}</span>
                    {tweet.owner.verified ? <i class="fas fa-check-circle"></i> : ''}
                    <span className="profile-screen-name">@{tweet.owner.screenName}</span>
                </a>
                <small className="ml-1">
                    .{getTimeElapsed(tweet.updatedAt)}
                </small>
                <p>{tweet.text}</p>
                <div>
                    {tweet.image ? <img src={tweet.image} alt="tweet media"/> : ''}
                </div>
                <div className="row">
                    <div className="col">
                        <span onClick={like} >
                            {displayLike()}
                        </span>
                        <small className="ml-2 text-muted">
                            {tweet.likesCount}
                        </small>
                    </div>
                    <div className="col">
                        <FontAwesomeIcon icon={['far', 'comment-alt']}/>
                        <small className="ml-2 text-muted">
                            {tweet.commentsCount}
                        </small>
                    </div>
                    <div className="col">
                        <FontAwesomeIcon icon={['fas', 'share-alt']}/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Tweet;
