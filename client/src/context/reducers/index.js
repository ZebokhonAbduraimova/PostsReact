import { authInitialState, authReducer } from "./auth.reducer";
import { postsInitialState, postsReducer } from "./posts.reducer";
import { commentsInitialState, commentsReducer } from "./comments.reducer";
import {
  serverErrorInitialState,
  serverErrorReducer,
} from "./serverError.reducer";
import { picturesInitialState, picturesReducer } from "./pictures.reducer";

export const initialState = {
  auth: authInitialState,
  posts: postsInitialState,
  comments: commentsInitialState,
  serverError: serverErrorInitialState,
  pictures: picturesInitialState,
};

export const rootReducer = (
  { auth, posts, comments, serverError, pictures },
  action
) => {
  return {
    auth: authReducer(auth, action),
    posts: postsReducer(posts, action),
    comments: commentsReducer(comments, action),
    serverError: serverErrorReducer(serverError, action),
    pictures: picturesReducer(pictures, action),
  };
};
