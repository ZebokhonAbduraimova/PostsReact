import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/context";

import { getPostById } from "../context/actions/posts.actions";
import { getPostComments } from "../context/actions/comments.actions";

import FullPost from "../components/fullPost/FullPost";
import Comments from "../components/comments/Comments";
import AddComment from "../components/comments/AddComment";
import ServerSideErrorListener from "../components/partials/ServerSideErrorListener";

const PostPage = () => {
  const [{}, dispatch] = useGlobalContext();
  const { postId } = useParams();

  useEffect(() => {
    getPostById({ postId }, dispatch);
    getPostComments({ postId }, dispatch);
  }, []);

  return (
    <div className="container">
      <ServerSideErrorListener />
      <FullPost />
      <Comments />
      <AddComment />
    </div>
  );
};

export default PostPage;
