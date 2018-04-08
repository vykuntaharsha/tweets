import React from 'react';

const PostTweet = () =>{
    return (
        <div className="row">
            <div className="col-1">
                <img src={user.profilePicture} alt="profile picture"/>
            </div>
            <div className="col-11">
                <textarea
                    ref={node => input=node}
                    placeholder="What's happening?" >
                </textarea>
                <button
                    className="btn btn-primary disabled"
                    onClick={} >
                    Tweet
                </button>
            </div>
        </div>
    );
};

export default PostTweet;
