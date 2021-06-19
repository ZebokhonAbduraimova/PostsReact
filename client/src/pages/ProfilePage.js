import React, { useEffect } from "react";
import { useGlobalContext } from "../context/context";

import ProfileUserInfo from "../components/profile/ProfileUserInfo";
import ProfileDelete from "../components/profile/ProfileDelete";
import Comments from "../components/comments/Comments";
import PostsList from "../components/posts/PostsList";
import ServerSideErrorListener from "../components/partials/ServerSideErrorListener";

import { getUserComments } from "../context/actions/comments.actions";
import { getUserPosts } from "../context/actions/posts.actions";

const ProfilePage = () => {
  const [{}, dispatch] = useGlobalContext();

  useEffect(() => {
    getUserPosts(dispatch);
    getUserComments(dispatch);
  }, []);

  return (
    <>
      <ServerSideErrorListener />
      <ProfileUserInfo />
      <div className="container">
        <PostsList />
        <Comments />
        <ProfileDelete />
      </div>
    </>
  );
};

export default ProfilePage;
