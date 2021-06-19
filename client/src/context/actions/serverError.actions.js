import { ServerErrorConstants } from "../ActionTypeConstants";

export const clearServerError = (dispatch) => {
  dispatch({
    type: ServerErrorConstants.CLEAR_SERVER_ERROR,
  });
};

export const handleServerError = (error, dispatch) => {
  dispatch({
    type: ServerErrorConstants.SET_SERVER_ERROR,
    error: error,
  });
};
