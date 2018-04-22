import React from 'react';
import Reply from './Reply';

const RepliesList = ({replies, handleReply}) => {

    const renderReplies = replies.map((item, index) => (
        <Reply key={index} comment={item} handleReply={handleReply}/>
    ));

    return (
        <div className="comment-list">
            {renderReplies}
        </div>
    );

}

export default RepliesList
