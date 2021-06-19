import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./css/App.css";

import Navigation from "./components/partials/Navigation";
import Footer from "./components/partials/Footer";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddPostPage from "./pages/AddPostPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";
import ErrorPage from "./pages/ErrorPage";

import PrivateRoute from "./components/Routes/PrivateRoute";

import { useGlobalContext } from "./context/context";
import { getUserByToken } from "./context/actions/auth.actions";
import { setPicturesPath } from "./context/actions/pictures.actions";

export default function App() {
  const [{}, dispatch] = useGlobalContext();

  useEffect(() => {
    getUserByToken(dispatch);
    setPicturesPath(dispatch);
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute path="/posts/add" renderComponent={AddPostPage} />
        <PrivateRoute
          path="/posts/edit/:postId"
          renderComponent={EditPostPage}
        />
        <Route path="/posts/:postId" component={PostPage} />
        <PrivateRoute exact path="/profile" renderComponent={ProfilePage} />
        <Route exact path="/error" component={ErrorPage} />
        <Route exact path="/" component={HomePage} />
        <Redirect from="*" to="/error" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
