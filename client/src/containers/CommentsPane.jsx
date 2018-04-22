import React, {Component} from 'react';
import CommentsList from '../components/CommentsList';
import {postComment, fetchComments} from '../services';
import {connect} from 'react-redux';


class CommentsPane extends Component{
    constructor(props) {
        super(props);
        this.state = {
            comments : [],
            page : 0,
            hasMore : false,
        };

        this.isFetching  = false;
        this.addComment = this.addComment.bind(this);
        this.loadMoreComments = this.loadMoreComments.bind(this);
    }


    componentDidMount(){
        if(!this.props.tweet.commentsCount) return;
        this.isFetching = true;
        fetchComments(this.props.tweet._id)
            .then(data => this.handleComments(data.comments))
            .catch(err => this.handleError(err) );
    }

    handleComments(moreComments){

        const {page} = this.state;

        this.setState({

            comments : [...this.state.comments, ...moreComments],
            page : page + 1,
            hasMore : moreComments.length !== 0

        }, ()=>this.isFetching = false);
    }

    loadMoreComments(){
        if(!this.isFetching){
            fetchComments(this.props.tweet._id, this.state.page)
                .then(data => this.handleComments(data.comments))
                .catch(err => this.handleError(err) );
        }
    }

    handlePostComment(text){
        postComment(this.props.tweet._id, text)
            .then(data => this.handleComments([data.comment]))
            .catch(err => this.handleError(err) );
    }

    handleError(error){
        this.isFetching = false;
        this.setState({
            comments : []
        });
    }

    addComment(e){
        if(e.key === 'Enter'){
            this.handlePostComment(e.target.value);
            e.target.value = '';
        }
    }

    render(){
        let input;
        return (
            <div className="col-12 mt-2 comments-pane bg-light">

                <img
                    className="comment-profile-img"
                    src={this.props.user.profilePicture}
                    alt="profile"
                />
                <input
                    className="comment-input"
                    ref={node => input=node}
                    value={input}
                    placeholder="Write a comment..."
                    onKeyPress={this.addComment}
                />
                <CommentsList
                    comments={this.state.comments}
                />
                {
                    this.state.hasMore ?
                    <span
                        onClick={()=>{this.loadMoreComments()}}
                        className="view-more-comments"
                        >
                        View more comments
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

export default connect(mapStateToProps)(CommentsPane);
