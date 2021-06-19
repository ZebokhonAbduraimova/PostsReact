import { CommentsConstants } from "../ActionTypeConstants";
import axios from "axios";

export const addComment = async ({ postId, content }, dispatch) => {
  try {
    const res = await axios.post(`/comments/post/${postId}`, { content });

    if (res) {
      dispatch({
        type: CommentsConstants.ADD_COMMENT,
        comment: res.data.comment,
      });
    }
  } catch (error) {
    dispatch({
      type: CommentsConstants.COMMENT_ERRORS,
      errors: error.response.data.errors,
    });
  }
};

export const getPostComments = async ({ postId }, dispatch) => {
  try {
    const res = await axios.get(`/comments/post/${postId}`);
    if (res) {
      dispatch({
        type: CommentsConstants.GET_COMMENTS,
        comments: res.data.comments,
      });
    }
  } catch (error) {
    console.log("Error occured");
  }
};

export const getUserComments = async (dispatch) => {
  try {
    const res = await axios.get(`/comments/user`);
    if (res) {
      dispatch({
        type: CommentsConstants.GET_COMMENTS,
        comments: res.data.comments,
      });
    }
  } catch (error) {
    console.log("Error occured");
  }
};

export const deleteCommentById = async ({ commentId }, dispatch) => {
  try {
    const res = await axios.delete(`/comments/${commentId}`);
    if (res) {
      dispatch({
        type: CommentsConstants.DELETE_COMMENT,
        commentId: commentId,
      });
    }
  } catch (error) {
    console.log("Error occured");
  }
};

export const editCommentById = async ({ commentId, content }, dispatch) => {
  try {
    const res = await axios.put(`/comments/${commentId}`, { content });
    if (res) {
      dispatch({
        type: CommentsConstants.EDIT_COMMENT,
        comment: res.data.comment,
      });
    }
  } catch (error) {
    dispatch({
      type: CommentsConstants.COMMENT_ERRORS,
      errors: error.response.data.errors,
    });
  }
};

export const clearCommentErrors = async (dispatch) => {
  dispatch({
    type: CommentsConstants.CLEAR_COMMENT_ERRORS,
  });
};
