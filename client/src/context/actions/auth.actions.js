import axios from "axios";
import { AuthConstants } from "../ActionTypeConstants";

const setLoading = (isLoading, dispatch) => {
  dispatch({
    type: AuthConstants.SET_AUTH_LOADING,
    payload: isLoading,
  });
};

export const register = async ({ name, email, password }, dispatch) => {
  try {
    setLoading(true, dispatch);

    const res = await axios.post("/auth/register", {
      name,
      email,
      password,
    });
    if (res) {
      dispatch({
        type: AuthConstants.REGISTER_USER,
        user: res.data.user,
        cookie: res.data.cookie,
      });
    }
  } catch (error) {
    dispatch({
      type: AuthConstants.AUTH_ERROR,
      errors: error.response.data.errors,
    });
  }
};

export const login = async ({ email, password }, dispatch) => {
  try {
    setLoading(true, dispatch);
    const res = await axios.post("/auth/login", {
      email,
      password,
    });
    if (res) {
      console.log(res);
      dispatch({
        type: AuthConstants.LOGIN_USER,
        user: res.data.user,
        cookie: res.data.cookie,
      });
    }
  } catch (error) {
    dispatch({
      type: AuthConstants.AUTH_ERROR,
      errors: error.response.data.errors,
    });
  }
};

export const logout = async (dispatch) => {
  try {
    setLoading(true, dispatch);
    const res = await axios.get("/auth/logout");
    if (res) {
      dispatch({
        type: AuthConstants.LOGOUT_USER,
      });
    }
  } catch (error) {
    dispatch({
      type: AuthConstants.AUTH_ERROR,
      errors: error.response.data.errors,
    });
  }
};

export const getUserByToken = async (dispatch) => {
  try {
    setLoading(true, dispatch);
    const res = await axios.get("/auth/getUserByToken");
    if (res) {
      dispatch({
        type: AuthConstants.GET_USER_BY_TOKEN,
        user: res.data.user,
      });
    }
  } catch (error) {
    console.log("Error occured");
  }
};

export const updateUserThumbnail = async ({ formData }, dispatch) => {
  try {
    setLoading(true, dispatch);
    const res = await axios.put("/users/user", formData);
    if (res) {
      dispatch({
        type: AuthConstants.UPDATE_USER_THUMBNAIL,
        user: res.data.user,
      });
    }
  } catch (error) {
    dispatch({
      type: AuthConstants.UPDATE_USER_THUMBNAIL_ERROR,
      errors: error.response.data.errors,
    });
  }
};

export const deleteAccount = async (dispatch) => {
  try {
    setLoading(true, dispatch);
    const res = await axios.delete("/users/user");
    if (res) {
      dispatch({
        type: AuthConstants.DELETE_ACCOUNT,
      });
    }
  } catch (error) {
    console.log("Error occured");
  }
};

export const clearAuthErrors = (dispatch) => {
  dispatch({
    type: AuthConstants.CLEAR_AUTH_ERRORS,
  });
};
