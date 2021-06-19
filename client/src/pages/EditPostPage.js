import React, { useEffect, useRef, useState } from "react";
import {
  getPostById,
  clearPostErrors,
  editPostById,
  clearPostSuccess,
} from "../context/actions/posts.actions";
import { useGlobalContext } from "../context/context";
import { Editor } from "@tinymce/tinymce-react";
import { useParams, useHistory } from "react-router-dom";
import ServerSideErrorListener from "../components/partials/ServerSideErrorListener";

const EditPostPage = () => {
  const history = useHistory();
  const { postId } = useParams();

  const [{ posts, pictures }, dispatch] = useGlobalContext();

  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEditorChange = () => {
    setContent(editorRef.current.getContent());
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("file", file);
    editPostById({ postId, formData }, dispatch);
    setIsSubmitted(true);
  };

  // first render
  useEffect(() => {
    clearPostErrors(dispatch);
    clearPostSuccess(dispatch);
    getPostById({ postId }, dispatch);
  }, []);

  useEffect(() => {
    if (!posts.isLoading && posts.post) setContent(posts.post.content);
  }, [posts.isLoading]);

  // After submit
  useEffect(() => {
    if (posts.success) {
      setContent("");
      setFile(null);
      clearPostErrors(dispatch);
      clearPostSuccess(dispatch);
      history.push("/");
    }
  }, [posts.success]);

  const Picture = () =>
    posts.post?.pictureName && pictures.path ? (
      <div className="editPost__picture">
        <img src={`${pictures.path}${posts.post?.pictureName}`} alt="" />
      </div>
    ) : (
      <div>No picture, upload one</div>
    );

  if (posts.isLoading) {
    return <div className="container">Loading...</div>;
  }
  return (
    <div className="container">
      <ServerSideErrorListener />
      <Picture />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
          />
          <p style={{ color: "red" }}>{posts.errors?.file}</p>
          <Editor
            onInit={(e, editor) => (editorRef.current = editor)}
            value={content}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:18px }",
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <p style={{ color: "red" }}>{posts.errors?.content}</p>

        <button type="submit" disabled={isSubmitted}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
