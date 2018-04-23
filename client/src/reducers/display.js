import {display} from '../constants';

export const displayReducer = (state=display.HOME, action)=>{

    switch (action.type) {
        case display.HOME:
            state= display.HOME;
            break;
        case display.PROFILE:
            state = display.PROFILE;
            break;

        case display.NOTIFICATIONS:
            state =  display.NOTIFICATIONS;
            break;

        case display.HASHTAGS:
            state =  display.HASHTAGS;
            break;
        default :
            return state;
    }

    return state;
};
