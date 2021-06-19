import React from "react";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import "../../css/FullPost.css";
import { useGlobalContext } from "../../context/context";

const FullPost = () => {
  const [{ posts, pictures }] = useGlobalContext();

  const Picture = () =>
    posts.post?.pictureName && pictures.path ? (
      <div className="fullPost__picture">
        <img src={`${pictures.path}${posts.post?.pictureName}`} alt="" />
      </div>
    ) : (
      <div className="fullPost__picture">No picture</div>
    );

  const Content = () => (
    <div className="fullPost__content">
      {ReactHtmlParser(posts.post?.content)}
    </div>
  );

  const AuthorThumbnail = () =>
    posts.post?.createdBy.thumbnailName && pictures.path ? (
      <img
        src={`${pictures.path}${posts.post?.createdBy.thumbnailName}`}
        alt="thumbnail"
      />
    ) : (
      <img
        src={`${process.env.PUBLIC_URL}/images/thumbnail.png`}
        alt="thumbnail"
      />
    );

  const Details = () => (
    <div className="fullPost__details">
      <div className="fullPost__details__author">
        <AuthorThumbnail />
        {posts.post?.createdBy.name}
      </div>
      <div className="fullPost__details__date">
        {moment(posts.post?.dateCreated).calendar()}
      </div>
    </div>
  );

  if (posts.loading) {
    return <div className="fullPost">Loading...</div>;
  }
  return (
    <div className="fullPost">
      <Picture />
      <Content />
      <Details />
    </div>
  );
};

export default FullPost;
