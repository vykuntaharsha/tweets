import React from 'react';
import {displayHashtags} from '../actions';
const processString = require('react-process-string');


const TweetText = ({text, dispatch, hashtags, userMentions})=>{

    if(!text) return'';

    if(hashtags.length === 0 && userMentions.length === 0){
        return <span>
            {text}
        </span>;
    }

    const renderHashtag = (key, result)=> {
        return (
            <span
                key={key}
                className="hashtag"
                onClick={()=>dispatch(displayHashtags(result[1].substr(1)))}
                >
                {result[1]}
            </span>
        );
    }

    const tags = hashtags.map(tag => {
        const re = new RegExp(`(#${tag})`, 'g');
        return {
            regex : re,
            fn : renderHashtag
        }
    });



    const config = [...tags];

    const processed = processString(config)(text);
    return (
        <span>
            {processed}
        </span>
    );
};


export default TweetText;
