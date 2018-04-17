import { auth } from '../constants';

export const authentication = (state = {}, action) => {

    switch (action.type) {
        case auth.LOGIN_REQUEST:
          return {
            ...state,
            loginLoading : true,
            isAuthenticated: false,
            user: null
          };
        case auth.LOGIN_SUCCESS:
          return {
            ...state,
            loginLoading : false,
            isAuthenticated: true,
            user: action.user
          };
        case auth.LOGIN_FAILURE:
          return {
              ...state,
              loginLoading : false,
              isAuthenticated: false,
              user: null
          };
        case auth.LOGOUT:
          return {
              isAuthenticated: false,
              user: null
          };

        case auth.UPDATE_USER:
            return {
                ...state,
                user: action.user
            };
            
        case auth.INVALID_REQUEST:
            return {
                ...state,
                isAuthenticated: false,
                notifyUser : true,
                loginLoading : false
            };
        default:
          return state;
    }
}
