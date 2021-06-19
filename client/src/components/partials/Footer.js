import React from "react";
import "../../css/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" />
      </div>
      <p>zebokhon abduraimova</p>
    </div>
  );
};

export default Footer;
