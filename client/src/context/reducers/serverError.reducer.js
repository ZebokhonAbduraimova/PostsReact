import { ServerErrorConstants } from "../ActionTypeConstants";

export const serverErrorInitialState = {
  statusText: null,
  status: null,
};

export const serverErrorReducer = (state, action) => {
  switch (action.type) {
    case ServerErrorConstants.SET_SERVER_ERROR:
      return {
        ...state,
        statusText: action.error.statusText,
        status: action.error.status,
      };
    case ServerErrorConstants.CLEAR_SERVER_ERROR:
      return {
        ...state,
        statusText: null,
        status: null,
      };
    default:
      return state;
  }
};
