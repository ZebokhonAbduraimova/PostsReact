import { PicturesConstants } from "../ActionTypeConstants";

export const picturesInitialState = {
  path: null,
};

export const picturesReducer = (state, action) => {
  switch (action.type) {
    case PicturesConstants.SET_PICTURES_PATH:
      return {
        ...state,
        path: action.path,
      };
    default:
      return state;
  }
};
