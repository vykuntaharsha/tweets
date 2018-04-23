import {postToTwitter} from '../services';
import {shareActions} from '../constants';

export const shareOnTwitter = (id) => (dispatch, getState) => {
    const {share} = getState();

    if(share.isRequested)return ;

    dispatch({type : shareActions.REQUEST});
    return postToTwitter(id)
            .then(data => dispatch({
                type : shareActions.RECEIVE_RESPONSE,
                url : data.url
            }))
            .catch(error => dispatch({type : shareActions.ERROR}));
};

export const resetSharePopup = () =>({
    type : shareActions.RESET_POPUP
})
