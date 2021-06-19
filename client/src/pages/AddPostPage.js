import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useHistory } from "react-router-dom";
import {
  addPost,
  clearPostErrors,
  clearPostSuccess,
} from "../context/actions/posts.actions";
import { useGlobalContext } from "../context/context";
import ServerSideErrorListener from "../components/partials/ServerSideErrorListener";

const AddPostPage = () => {
  const history = useHistory();
  const editorRef = useRef(null);
  const [{ posts }, dispatch] = useGlobalContext();

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
    addPost({ formData }, dispatch);
    setIsSubmitted(true);
  };

  useEffect(() => {
    clearPostErrors(dispatch);
    clearPostSuccess(dispatch);
  }, []);

  useEffect(() => {
    if (posts.success) {
      setContent("");
      setFile(null);
      clearPostErrors(dispatch);
      clearPostSuccess(dispatch);
      history.push("/");
    }
  }, [posts.success]);

  return (
    <div className="container">
      <ServerSideErrorListener />
      <form onSubmit={handleSubmit}>
        <div>
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

        <input type="file" name="file" id="file" onChange={handleFileChange} />
        <p style={{ color: "red" }}>{posts.errors?.file}</p>

        <button type="submit" disabled={isSubmitted}>
          Save
        </button>
      </form>
    </div>
  );
};

export default AddPostPage;
