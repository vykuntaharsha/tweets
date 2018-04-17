import React from 'react';
import {connect} from 'react-redux';
import {postTweet} from '../actions';

const PostTweet = ({isAuthenticated, user, dispatch}) =>{
    if(!isAuthenticated) return '';
    let input;
    const handlePostTweet = (e)=>{
        dispatch(postTweet(input.value));
        input.value = '';
    }
    return (
        <div className="row post-tweet p-2 mr-2 ml-1 mb-2">
            <div className="col-lg-1 col-2">
                <img className="rounded-circle" src={user.profilePicture} alt="profile"/>
            </div>
            <div className="col-lg-11 col-10 text-right">
                <textarea
                    className="form-control tweet-area-input"
                    ref={node => input=node}
                    placeholder="What's happening?"
                    value={input}>
                </textarea>
                <button
                    className="btn btn-primary disabled mt-2"
                    onClick={handlePostTweet} >
                    Tweet
                </button>
            </div>
        </div>
    );
};
const mapStateToProps = state => {
  const { authentication } = state;

  return {
      isAuthenticated : authentication.isAuthenticated,
      user : authentication.user
  }
}

export default connect(mapStateToProps)(PostTweet);
