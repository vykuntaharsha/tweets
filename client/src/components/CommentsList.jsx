import React from 'react';
import Comment from './Comment';

const CommentsList = ({comments, dispatch}) => {

    const renderComments = comments.map((item) => (
        <Comment key={item._id} comment={item} dispatch={dispatch}/>
    ));

    return (
        <div className="comment-list">
            {renderComments}
        </div>
    );

}



export default CommentsList;
