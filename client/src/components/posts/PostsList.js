import React from "react";
import { useGlobalContext } from "../../context/context";
import SinglePost from "./SinglePost";
import "../../css/PostsList.css";

const PostsList = () => {
  const [{ posts }] = useGlobalContext();

  if (posts.isLoading) {
    <div className="container">Loading...</div>;
  } else if (posts.posts.length <= 0) {
    return (
      <div style={{ textAlign: "center", color: "darkgray" }}>
        <p>No posts </p>
      </div>
    );
  }

  return (
    <div className="posts">
      {posts.posts.map((post) => (
        <SinglePost post={post} key={post._id} />
      ))}
    </div>
  );
};

export default PostsList;
