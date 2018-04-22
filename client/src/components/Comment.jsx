import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import RepliesPane from '../containers/RepliesPane';


class Comment extends Component {

    constructor(props){
        super();
        this.state = {
            clickedReplies : false
        }

        this.toggleViewReplies = this.toggleViewReplies.bind(this);
    }

    toggleViewReplies(){
        this.setState({
            clickedReplies : true
        });
    }

    renderReplies(){
        if(this.state.clickedReplies){
            return <RepliesPane comment={this.props.comment}/>;
        }
        return '';
    }

    handleReplies(){
        if(this.props.comment.repliesCount && !this.state.clickedReplies){
            return (
                <span
                    className="ml-2 comment-options"
                    onClick={()=>{this.toggleViewReplies()}}>
                    View replies
                </span>
            )
        }

        return '';
    }

    render(){
        const {comment} = this.props;

        return(
            <div className="comment-container">
                <div>
                    <img
                        className="comment-profile-img"
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
                    <div>
                        <span
                            className="comment-options"
                            onClick={()=>{this.toggleViewReplies()}}>
                            Reply
                        </span>
                         {this.handleReplies()}
                    </div>
                </div>

                {this.renderReplies()}
            </div>
        );
    }
}


export default Comment;
