import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { deletePostById } from "../../context/actions/posts.actions";

const SinglePostButtons = ({ postId, createdBy }) => {
  const [{ auth }, dispatch] = useGlobalContext();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePost = () => {
    deletePostById({ postId }, dispatch);
    setIsDeleting(false);
  };

  const GuestBtns = () => (
    <div className="post__btns">
      <div></div>
      <Link to={`/posts/${postId}`}>Read</Link>
    </div>
  );

  const AuthorBtns = () => {
    if (!auth.user) return;
    if (auth.user._id !== createdBy._id) return;

    return (
      <div className="post__btns">
        <div>
          <button onClick={() => setIsDeleting(true)}>Delete</button>
          <Link to={`/posts/edit/${postId}`}>
            <button type="button">Edit</button>
          </Link>
        </div>

        <Link to={`/posts/${postId}`}>Read</Link>
      </div>
    );
  };

  const DeleteConfirmation = () => {
    if (!auth.user) return;
    if (auth.user._id !== createdBy._id) return;
    if (!isDeleting) return;

    return (
      <div className="post__btns">
        <div className="post__btns__delete__confirm">
          <p>Are you sure you want to permanently delete this post?</p>
          <button onClick={handleDeletePost}>Confirm</button>
          <button onClick={() => setIsDeleting(false)}>Cancel</button>
        </div>

        <Link to={`/posts/${postId}`}>Read</Link>
      </div>
    );
  };

  if (auth.user && auth.user?._id === createdBy._id) {
    if (isDeleting) {
      return <DeleteConfirmation />;
    }
    return <AuthorBtns />;
  }

  return <GuestBtns />;
};

export default SinglePostButtons;
