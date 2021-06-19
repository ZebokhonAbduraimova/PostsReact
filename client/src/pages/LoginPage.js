import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { clearAuthErrors, login } from "../context/actions/auth.actions";
import { useGlobalContext } from "../context/context";
import { useHistory } from "react-router-dom";
import "../css/Auth.css";

const LoginPage = () => {
  const [{ auth }, dispatch] = useGlobalContext();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
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

        <button type="submit">Login</button>
        <p>
          No Account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
