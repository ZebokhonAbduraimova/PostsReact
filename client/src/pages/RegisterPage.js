import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { register, clearAuthErrors } from "../context/actions/auth.actions";
import { useGlobalContext } from "../context/context";

import "../css/Auth.css";

const RegisterPage = () => {
  const [{ auth }, dispatch] = useGlobalContext();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password }, dispatch);
  };

  useEffect(() => {
    clearAuthErrors(dispatch);
  }, []);

  useEffect(() => {
    if (auth.user) {
      history.push("/");
    }
  }, [auth.user]);

  return (
    <div className="container auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span style={{ color: "red" }}>{auth.errors?.name}</span>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span style={{ color: "red" }}>{auth.errors?.email}</span>

        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span style={{ color: "red" }}>{auth.errors?.password}</span>

        <button type="submit">Create account</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
