import { combineReducers } from 'redux';
import { authentication } from './authentication';
import {tweets} from './tweets';
import {trends} from './trends';
import {displayReducer} from './display';
import {profile} from './profile';
import {popular} from './popular';
import {followeeSuggestions} from './followee-suggestions';
import {share} from './share';
import {users} from './users';

export default combineReducers({
    authentication,
    tweets,
    trends,
    display : displayReducer,
    profile,
    popular,
    followeeSuggestions,
    share,
    users
});
