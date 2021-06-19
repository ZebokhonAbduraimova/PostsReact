import React from "react";
import moment from "moment";
import CommentBody from "./CommentBody";
import { useGlobalContext } from "../../context/context";

const Comment = ({ comment }) => {
  const [{ pictures }] = useGlobalContext();

  const Details = () => (
    <div className="comment__details">
      <AuthorThumbnail />
      <div>
        <p className="comment__details__date">
          {moment(comment.dateCreated).calendar()}
        </p>
        <p className="comment__details__name">{comment.createdBy.name}</p>
      </div>
    </div>
  );

  const AuthorThumbnail = () =>
    comment.thumbnailName && pictures.path ? (
      <img src={`${pictures.path}${comment.thumbnailName}`} alt="thumbnail" />
    ) : (
      <img
        src={`${process.env.PUBLIC_URL}/images/thumbnail.png`}
        alt="thumbnail"
      />
    );

  return (
    <div className="comment">
      <Details />
      <CommentBody comment={comment} />
    </div>
  );
};

export default Comment;
