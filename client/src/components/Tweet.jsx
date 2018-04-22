import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {getTimeElapsed} from '../util/time';
import ReactTooltip from 'react-tooltip';
import CommentsPane from '../containers/CommentsPane';

class Tweet extends Component {
    constructor(props) {
        super();
        this.state={
            clickedComment : false
        }
        this.changeCommentsState = this.changeCommentsState.bind(this);
    }


    componentWillReceiveProps(nextProps){
        this.props = nextProps
    }

    changeCommentsState(){
        if(!this.clickedComment){
            this.setState({
                clickedComment : true
            });
        }
    }

    renderComments(){
        if(this.state.clickedComment){
            return <CommentsPane tweet={this.props.tweet}/>
        }
        return '';
    }

    render(){
        const {tweet, like, profile, share} = this.props;

        const displayLike = ()=>{
            if(tweet.isLikedByUser){
                return <FontAwesomeIcon icon={['fas', 'heart']} className="liked"/>;
            }
            return  <FontAwesomeIcon icon={['far', 'heart']}/>;
        }
        return (
            <div className="row p-2 mb-2 mr-2 ml-1 bg-light">
                <div className="col-12 bg-white">
                    <div className="row p-2">
                        <div className="col-lg-1 col-2">
                            <img
                                className="rounded-circle profile-img"
                                src={tweet.owner.profilePicture} alt="profile"
                                onClick={profile}
                            />
                        </div>
                        <div className="col-lg-11 col-10">
                            <a onClick={profile}>
                                <span className="profile-name">{tweet.owner.name}</span>
                                {tweet.owner.verified ? <FontAwesomeIcon icon={['fas', 'check-circle']}/> : ''}
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
                                    <span
                                        onClick={like}
                                        data-tip="Like"
                                        data-for={"like"+tweet._id}
                                        data-class="tweets-tooltip"
                                        >
                                        {displayLike()}
                                        <ReactTooltip
                                            id={"like"+tweet._id}
                                            place="bottom" type="dark" effect="solid"
                                            offset={{bottom: 10, right: 10}}
                                        />
                                    </span>
                                    <small className="ml-2 text-muted">
                                        {tweet.likesCount}
                                    </small>
                                </div>
                                <div className="col">
                                    <span
                                        onClick={this.changeCommentsState}
                                        data-tip="Comment"
                                        data-for={"comment"+tweet._id}
                                        data-class="tweets-tooltip"
                                        >
                                        <FontAwesomeIcon icon={['far', 'comment-alt']}/>
                                        <ReactTooltip
                                            id={"comment"+tweet._id}
                                            place="bottom" type="dark" effect="solid"
                                            offset={{bottom: 15, right: 10}}
                                        />
                                    </span>

                                    <small className="ml-2 text-muted">
                                        {tweet.commentsCount}
                                    </small>
                                </div>
                                <div className="col">
                                    <span
                                        onClick={share}
                                        data-tip="Share on Twitter"
                                        data-for={"share"+tweet._id}
                                        data-class="tweets-tooltip"
                                        >
                                        <FontAwesomeIcon icon={['fas', 'share-alt']}/>
                                        <ReactTooltip
                                            id={"share"+tweet._id}
                                            place="bottom" type="dark" effect="solid"
                                            offset={{bottom: 10, right: 10}}
                                        />
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                {this.renderComments()}
            </div>
        );
    }
}

export default Tweet;
