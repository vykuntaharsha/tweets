import React, {Component} from 'react';
import RepliesList from '../components/RepliesList';
import {postReply, fetchReplies} from '../services';
import {connect} from 'react-redux';

class RepliesPane extends Component{
    constructor(props) {
        super(props);
        this.state = {
            replies : [],
            page : 0,
            hasMore : false
        };

        this.isFetching  = false;
        this.loadMoreReplies = this.loadMoreReplies.bind(this);
        this.addReply = this.addReply.bind(this);
        this.handleReplyClick = this.handleReplyClick.bind(this);
        this.inputField = '';
    }


    componentDidMount(){
        this.isFetching = true;
        fetchReplies(this.props.comment._id)
            .then(data => this.handleReplies(data.comments))
            .catch(err => this.handleError(err));
    }

    handleReplies(moreReplies){

        const {page} = this.state;

        this.setState({

            replies : [...this.state.replies, ...moreReplies],
            page : page + 1,
            hasMore : moreReplies.length !== 0

        }, ()=>this.isFetching = false);
    }

    loadMoreReplies(){
        if(!this.isFetching ){
            fetchReplies(this.props.comment._id, this.state.page)
                .then(data => this.handleReplies(data.comments))
                .catch(err => this.handleError(err));
        }
    }

    handlePostReply(text){
        postReply(this.props.comment._id, text)
            .then(data => this.handleReplies([data.comment]))
            .catch(err => this.handleError(err));
    }

    handleError(error){
        this.isFetching = false;
        this.setState({
            replies : []
        })
    }

    addReply(e){
        if(e.key === 'Enter'){
            this.handlePostReply(e.target.value);
            e.target.value = '';
        }
    }

    handleReplyClick(comment){
        this.inputField.value = `@${comment.owner.screenName}`
    }

    render(){

        let input
        return (
            <div className="col-12 mt-2 replies-pane bg-light">
                <RepliesList
                    replies={this.state.replies}
                    handleReply={this.handleReplyClick}
                    dispatch={this.props.dispatch}
                />
                <img
                    className="replies-profile-img"
                    src={this.props.user.profilePicture}
                    alt="profile"
                />
                <input
                    className="reply-input"
                    ref={node =>{
                        input = node;
                        this.inputField = node;
                    }}
                    value={input}
                    placeholder="Write a reply..."
                    onKeyPress={this.addReply}
                />
                {
                    this.state.hasMore ?
                    <span
                        onClick={()=>{this.loadMoreReplies()}}
                        className="comment-options"
                        >
                        View more replies
                    </span>
                    : ''
                }
            </div>
        );

    }


}

const mapStateToProps= (state)=>{
    const {user} = state.authentication;

    return {user};
};

export default connect(mapStateToProps)(RepliesPane);
