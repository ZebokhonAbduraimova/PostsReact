import React, { useEffect } from "react";
import PostsList from "../components/posts/PostsList";
import { getPosts } from "../context/actions/posts.actions";
import { useGlobalContext } from "../context/context";

const HomePage = () => {
  const [{}, dispatch] = useGlobalContext();

  useEffect(() => {
    getPosts(dispatch);
  }, []);

  return (
    <div className="container">
      <PostsList />
    </div>
  );
};

export default HomePage;
