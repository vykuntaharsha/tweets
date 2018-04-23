import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {displayProfile} from '../actions';

class Reply extends Component {


    render(){
        const {comment, dispatch} = this.props;

        return(
            <div className="comment-container">
                <div>
                    <img
                        className="replies-profile-img"
                        src={comment.owner.profilePicture}
                        alt="profile"
                    />
                    <a className="comment">
                        <span className="comment-profile-name"
                            onClick={()=>{dispatch(displayProfile(comment.owner.screenName))}}>
                            {comment.owner.name}
                        </span>

                        <span>{comment.owner.verified ? <FontAwesomeIcon icon={['fas', 'check-circle']}/> : ''}
                        </span>

                        {comment.text}
                    </a>
                    <div className="comment-options-holder">
                        <span
                            className="comment-options"
                            onClick={()=>{ this.props.handleReply(comment)}}
                            >
                            Reply
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}


export default Reply;
