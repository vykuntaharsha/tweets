import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';


class Reply extends Component {


    render(){
        const {comment} = this.props;

        return(
            <div className="comment-container">
                <div>
                    <img
                        className="replies-profile-img"
                        src={comment.owner.profilePicture}
                        alt="profile"
                    />
                    <a className="comment">
                        <span className="comment-profile-name">
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
