import axios from "axios";
import { PicturesConstants } from "../ActionTypeConstants";

export const setPicturesPath = async (dispatch) => {
  try {
    const res = await axios.get("/pictures/path");
    if (res) {
      dispatch({
        type: PicturesConstants.SET_PICTURES_PATH,
        path: res.data.picturesPath,
      });
    }
  } catch (error) {
    console.log("Error occured");
  }
};
