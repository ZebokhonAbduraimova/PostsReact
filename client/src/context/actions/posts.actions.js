import axios from "axios";
import { PostsConstants } from "../ActionTypeConstants";
import { handleServerError } from "./serverError.actions";

const setLoading = (isLoading, dispatch) => {
  dispatch({
    type: PostsConstants.SET_POSTS_LOADING,
    payload: isLoading,
  });
};

export const addPost = async ({ formData }, dispatch) => {
  try {
    setLoading(true, dispatch);

    const res = await axios.post("/posts/add", formData);
    if (res) {
      dispatch({
        type: PostsConstants.ADD_POST,
        post: res.data.post,
      });
    }
  } catch (error) {
    dispatch({
      type: PostsConstants.POST_ERRORS,
      errors: error.response.data.errors,
    });
  }
};

export const getPosts = async (dispatch) => {
  try {
    setLoading(true, dispatch);

    const res = await axios.get("/posts");
    if (res) {
      dispatch({
        type: PostsConstants.GET_POSTS,
        posts: res.data.posts,
      });
    }
  } catch (error) {
    console.log("Error occured");
  }
};

export const getPostById = async ({ postId }, dispatch) => {
  try {
    setLoading(true, dispatch);

    const res = await axios.get(`/posts/${postId}`);
    if (res) {
      dispatch({
        type: PostsConstants.GET_POST,
        post: res.data.post,
      });
    }
  } catch (error) {
    if (!error.response.data.errors) {
      handleServerError(
        {
          statusText: error.response.statusText,
          status: error.response.status,
        },
        dispatch
      );
    }
  }
};

export const getUserPosts = async (dispatch) => {
  try {
    setLoading(true, dispatch);

    const res = await axios.get("/posts/user");
    if (res) {
      dispatch({
        type: PostsConstants.GET_POSTS,
        posts: res.data.posts,
      });
    }
  } catch (error) {
    console.log("Error occured");
  }
};

export const deletePostById = async ({ postId }, dispatch) => {
  try {
    setLoading(true, dispatch);

    const res = await axios.delete(`/posts/${postId}`);
    if (res) {
      dispatch({
        type: PostsConstants.DELETE_POST,
        postId: postId,
      });
    }
  } catch (error) {
    if (!error.response.data.errors) {
      handleServerError(
        {
          statusText: error.response.statusText,
          status: error.response.status,
        },
        dispatch
      );
    }
  }
};

export const editPostById = async ({ postId, formData }, dispatch) => {
  try {
    setLoading(true, dispatch);

    const res = await axios.put(`/posts/${postId}`, formData);
    if (res) {
      dispatch({
        type: PostsConstants.EDIT_POST,
        post: res.data.post,
      });
    }
  } catch (error) {
    if (!error.response.data.errors) {
      handleServerError(
        {
          statusText: error.response.statusText,
          status: error.response.status,
        },
        dispatch
      );
    }
  }
};

export const clearPostErrors = (dispatch) => {
  dispatch({
    type: PostsConstants.CLEAR_POST_ERRORS,
  });
};

export const clearPostSuccess = (dispatch) => {
  dispatch({
    type: PostsConstants.CLEAR_POST_SUCCESS,
  });
};
