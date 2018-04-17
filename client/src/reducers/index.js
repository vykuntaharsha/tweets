import { combineReducers } from 'redux';
import { authentication } from './authentication';
import {tweets} from './tweets';
import {trends} from './trends'

export default combineReducers({
    authentication,
    tweets,
    trends
});
