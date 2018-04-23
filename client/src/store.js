import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {
    authentication : { isAuthenticated : false, loginLoading : false, user : null }
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);



export default store;
