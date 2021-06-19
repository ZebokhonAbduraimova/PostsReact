import { PostsConstants } from "../ActionTypeConstants";

export const postsInitialState = {
  posts: [],
  post: null,
  errors: null,
  isLoading: false,
  success: false,
};

export const postsReducer = (state, action) => {
  switch (action.type) {
    case PostsConstants.SET_POSTS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case PostsConstants.GET_POSTS:
      return {
        ...state,
        posts: [...action.posts],
        isLoading: false,
      };
    case PostsConstants.GET_POST:
      return {
        ...state,
        post: action.post,
        isLoading: false,
      };
    case PostsConstants.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.post],
        isLoading: false,
        success: true,
      };
    case PostsConstants.EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.post._id) {
            return action.post;
          }
          return post;
        }),
        isLoading: false,
        success: true,
      };
    case PostsConstants.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.postId),
        isLoading: false,
      };
    case PostsConstants.POST_ERRORS:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
        success: false,
      };
    case PostsConstants.CLEAR_POST_ERRORS:
      return {
        ...state,
        errors: null,
      };
    case PostsConstants.CLEAR_POST_SUCCESS:
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};
