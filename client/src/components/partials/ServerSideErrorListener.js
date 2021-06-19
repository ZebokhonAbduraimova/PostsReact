import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { clearServerError } from "../../context/actions/serverError.actions";

const ServerSideErrorListener = () => {
  const [{ serverError }, dispatch] = useGlobalContext();
  const history = useHistory();

  useEffect(() => {
    clearServerError(dispatch);
  }, []);

  useEffect(() => {
    if (serverError.statusText) {
      history.push("/error");
      clearServerError(dispatch);
    }
  }, [serverError.statusText]);
  return <></>;
};

export default ServerSideErrorListener;
