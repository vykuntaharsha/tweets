import {hashtagsActions} from '../constants';

export const hashtags = (state = {
    selectedTag : ''
}, action) =>{

    switch (action.type) {
        case hashtagsActions.SET_HASHTAG:

            return {
                selectedTag : action.tag
            };
        default:
            return state;
            
    }
};
