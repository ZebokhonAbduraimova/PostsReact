import { AuthConstants } from "../ActionTypeConstants";

export const authInitialState = {
  isLoading: false,
  user: null,
  errors: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case AuthConstants.SET_AUTH_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AuthConstants.LOGIN_USER:
      localStorage.setItem("jwt", action.cookie);
      return {
        ...state,
        user: action.user,
        isLoading: false,
      };
    case AuthConstants.REGISTER_USER:
      localStorage.setItem("jwt", action.cookie);
      return {
        ...state,
        user: action.user,
        isLoading: false,
      };
    case AuthConstants.GET_USER_BY_TOKEN:
      if (!action.user) {
        localStorage.removeItem("jwt");
      }
      return {
        ...state,
        user: action.user,
        isLoading: false,
      };
    case AuthConstants.LOGOUT_USER:
      localStorage.removeItem("jwt");
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    case AuthConstants.UPDATE_USER_THUMBNAIL:
      return {
        ...state,
        user: action.user,
        isLoading: false,
      };
    case AuthConstants.UPDATE_USER_THUMBNAIL_ERROR:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
      };
    case AuthConstants.DELETE_ACCOUNT:
      localStorage.removeItem("jwt");
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    case AuthConstants.AUTH_ERROR:
      return {
        ...state,
        user: null,
        errors: action.errors,
        isLoading: false,
      };
    case AuthConstants.CLEAR_AUTH_ERRORS:
      return {
        ...state,
        errors: null,
      };
    default:
      return state;
  }
};
