import React from "react";
import "../css/ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="container errorPage">
      <div className="errorPage__row">
        <div className="errorPage__col">
          <img
            src={`${process.env.PUBLIC_URL}/images/notfound1.png`}
            alt="not found 1"
          />
        </div>

        <div className="errorPage__col">
          <h1>
            404 <br /> Not Found
          </h1>
          <img
            src={`${process.env.PUBLIC_URL}/images/notfound2.png`}
            alt="not found 2"
          />
        </div>

        <div className="errorPage__col">
          <img
            src={`${process.env.PUBLIC_URL}/images/notfound3.png`}
            alt="not found 3"
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
