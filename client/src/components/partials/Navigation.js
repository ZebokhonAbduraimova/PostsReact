import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/Navigation.css";
import { logout } from "../../context//actions/auth.actions";
import { useGlobalContext } from "../../context/context";

const Navigation = () => {
  const [{ auth }, dispatch] = useGlobalContext();

  if (auth.user) {
    return (
      <div className="navigation">
        <ul>
          <li>
            <NavLink to="/">Posts</NavLink>
          </li>
          <li>
            <NavLink to="/posts/add">Add Post</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <button onClick={() => logout(dispatch)}>Logout</button>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="navigation">
        <ul>
          <li>
            <NavLink to="/">Posts</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </div>
    );
  }
};

export default Navigation;
