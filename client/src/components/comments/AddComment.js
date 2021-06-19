import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/context";
import {
  addComment,
  clearCommentErrors,
} from "../../context/actions/comments.actions";

const AddComment = () => {
  const [content, setContent] = useState("");
  const [{ comments, posts, auth }, dispatch] = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!auth.user) {
      return;
    }
    addComment({ postId: posts.post._id, content: content }, dispatch);
    setContent("");
  };

  useEffect(() => {
    clearCommentErrors(dispatch);
  }, []);

  return (
    <div className="addComment">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          placeholder="type here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!auth.user}
        />
        <button type="submit" disabled={!auth.user || !content}>
          Comment
        </button>
      </form>
      {!auth.user && (
        <span style={{ color: "darkgray" }}>login to comment</span>
      )}
      <span style={{ color: "red" }}>{comments.errors?.content}</span>
    </div>
  );
};

export default AddComment;
