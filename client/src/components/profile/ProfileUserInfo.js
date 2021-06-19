import React, { useState } from "react";
import { updateUserThumbnail } from "../../context/actions/auth.actions";
import { useGlobalContext } from "../../context/context";
import "../../css/Profile.css";

const ProfileUserInfo = () => {
  const [file, setFile] = useState(null);
  const [{ auth, pictures }, dispatch] = useGlobalContext();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    updateUserThumbnail({ formData }, dispatch);
    setFile(null);
  };

  const Thumbnail = () =>
    auth.user.thumbnailName && pictures.path ? (
      <img src={`${pictures.path}${auth.user.thumbnailName}`} alt="thumbnail" />
    ) : (
      <img
        src={`${process.env.PUBLIC_URL}/images/thumbnail.png`}
        alt="thumbnail"
      />
    );

  return (
    <div className="profile__userInfo">
      <div className="profile__userInfo__left">
        <Thumbnail />
      </div>
      <div className="profile__userInfo__right">
        <h1>{auth.user.name}</h1>

        <form onSubmit={handleSubmit}>
          <p>Upload picture</p>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
          />
          <span style={{ color: "red" }}>{auth.errors?.file}</span>

          <button type="submit" disabled={!file}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUserInfo;
