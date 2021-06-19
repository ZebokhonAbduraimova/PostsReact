import React from "react";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import SinglePostButtons from "./SinglePostButtons";
import { useGlobalContext } from "../../context/context";

const SinglePost = ({ post }) => {
  const [{ pictures }] = useGlobalContext();

  const Picture = () =>
    post.pictureName && pictures.path ? (
      <img src={`${pictures.path}${post.pictureName}`} alt="" />
    ) : (
      <img
        src={`${process.env.PUBLIC_URL}/images/defaultpost.png`}
        alt="no picture"
      />
    );

  const Details = () => (
    <div className="post__details">
      <p className="post__details__author">
        posted by
        <strong> {post.createdBy.name}</strong>
      </p>
      <p className="post__details__date">
        {moment(post.dateCreated).calendar()}
      </p>
    </div>
  );

  const Content = () => (
    <div className="post__content">{ReactHtmlParser(post.content)}</div>
  );

  return (
    <div className="post">
      <div className="post__top">
        <Picture />
      </div>

      <div className="post__bottom">
        <Details />
        <Content />
        <SinglePostButtons postId={post._id} createdBy={post.createdBy} />
      </div>
    </div>
  );
};

export default SinglePost;
