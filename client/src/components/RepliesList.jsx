import React from 'react';
import Reply from './Reply';

const RepliesList = ({replies, handleReply, dispatch}) => {

    const renderReplies = replies.map((item, index) => (
        <Reply key={index} comment={item} handleReply={handleReply} dispatch={dispatch}/>
    ));

    return (
        <div className="comment-list">
            {renderReplies}
        </div>
    );

}

export default RepliesList
