import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postTweet} from '../actions';


class PostTweet extends Component {
    constructor() {
        super();

        this.state = {
            tweetValue : '',
            tweetButtonDisabled : true
        }

        this.handleChange = this.handleChange.bind(this);
        this.handlePostTweet = this.handlePostTweet.bind(this);
    }

    handleChange(e){
        this.setState({
            tweetValue : e.target.value,
            tweetButtonDisabled : !e.target.value
        })
    }

    handlePostTweet = ()=>{
        this.props.dispatch(postTweet(this.state.tweetValue));
        this.setState({
            tweetValue : '',
            tweetButtonDisabled : true
        })
    }

    render(){
        const {isAuthenticated, user} = this.props;
        if(!isAuthenticated) return '';

        return (
            <div className="row post-tweet p-2 mr-2 ml-1 mb-2">
                <div className="col-lg-1 col-2">
                    <img
                        className="rounded-circle"
                        src={user.profilePicture}
                        alt="profile"
                        style={{width : 48+'px'}}
                    />
                </div>
                <div className="col-lg-11 col-10 text-right">
                    <textarea
                        className="form-control tweet-area-input"
                        placeholder="What's happening?"
                        onChange={this.handleChange}
                        value={this.state.tweetValue}>
                    </textarea>
                    <button
                        className="btn btn-primary mt-2"
                        disabled={this.state.tweetButtonDisabled}
                        onClick={this.handlePostTweet} >
                        Tweet
                    </button>
                </div>
            </div>
        );


    }
}

const mapStateToProps = state => {
  const { authentication } = state;

  return {
      isAuthenticated : authentication.isAuthenticated,
      user : authentication.user
  }
}

export default connect(mapStateToProps)(PostTweet);
