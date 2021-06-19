import React from "react";
import { useGlobalContext } from "../../context/context";
import Comment from "./Comment";
import "../../css/Comments.css";

const Comments = () => {
  const [{ comments }] = useGlobalContext();

  if (comments.comments.length <= 0) {
    return (
      <div className="comments">
        <p className="comments__noComments">No comments</p>
      </div>
    );
  }

  return (
    <div className="comments">
      {comments.comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
