import React, { useState } from "react";
import { deleteAccount } from "../../context/actions/auth.actions";
import { useGlobalContext } from "../../context/context";
import "../../css/Profile.css";

const ProfileDelete = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [{}, dispatch] = useGlobalContext();

  const handleDeleteAccount = () => {
    deleteAccount(dispatch);
  };

  if (isDeleting) {
    return (
      <div className="profile__delete">
        <div className="profile__delete__confirm">
          <p>Are you sure you want to permanently delete your account?</p>
          <div className="">
            <button onClick={handleDeleteAccount}>Confirm</button>
            <button onClick={() => setIsDeleting(false)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile__delete">
      <button onClick={() => setIsDeleting(true)}>Delete Account</button>
    </div>
  );
};

export default ProfileDelete;
