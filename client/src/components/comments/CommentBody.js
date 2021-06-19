import React, { useState } from "react";
import {
  editCommentById,
  deleteCommentById,
} from "../../context/actions/comments.actions";
import { useGlobalContext } from "../../context/context";

const CommentBody = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [content, setContent] = useState(comment.content);

  const [{ auth, comments }, dispatch] = useGlobalContext();

  const submitEditComment = (e) => {
    e.preventDefault();
    const commentId = comment._id;
    editCommentById({ commentId, content }, dispatch);
    setIsEditing(false);
  };

  const submitDeleteComment = (e) => {
    e.preventDefault();
    const commentId = comment._id;
    deleteCommentById({ commentId }, dispatch);
    setIsDeleting(false);
  };

  const GuestBody = () => (
    <div className="comment__body">
      <div className="comment__content">{content}</div>
    </div>
  );

  if (auth.user && comment.createdBy._id === auth.user._id) {
    if (isEditing) {
      return (
        <form className="comment__body" onSubmit={submitEditComment}>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p style={{ color: "red" }}>{comments.errors?.content}</p>

          <div>
            <button type="submit">Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      );
    } else if (isDeleting) {
      return (
        <form className="comment__body" onSubmit={submitDeleteComment}>
          <div className="comment__body__delete__msg">
            Are you sure you want to permanently delete the comment?
          </div>
          <div className="comment__btns">
            <button type="submit">Confirm</button>
            <button onClick={() => setIsDeleting(false)}>Cancel</button>
          </div>
        </form>
      );
    } else {
      return (
        <div className="comment__body">
          <div className="comment__content">{content}</div>
          <div className="comment__btns">
            <button onClick={() => setIsDeleting(true)}>Delete</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </div>
      );
    }
  }

  return <GuestBody />;
};

export default CommentBody;
