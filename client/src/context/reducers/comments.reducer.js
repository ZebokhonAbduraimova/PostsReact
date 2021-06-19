import { CommentsConstants } from "../ActionTypeConstants";

export const commentsInitialState = {
  comments: [],
  comment: null,
  errors: null,
};

export const commentsReducer = (state, action) => {
  switch (action.type) {
    case CommentsConstants.GET_COMMENTS:
      return {
        ...state,
        comments: [...action.comments],
      };
    case CommentsConstants.GET_COMMENT:
      return {
        ...state,
        comment: action.comment,
      };
    case CommentsConstants.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.comment],
      };
    case CommentsConstants.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.commentId
        ),
      };
    case CommentsConstants.EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.comment._id ? action.comment : comment
        ),
      };
    case CommentsConstants.COMMENT_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    case CommentsConstants.CLEAR_COMMENT_ERRORS:
      return {
        ...state,
        errors: null,
      };

    default:
      return state;
  }
};
