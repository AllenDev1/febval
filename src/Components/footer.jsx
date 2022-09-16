import React from "react";
import "../Scss/footer.scss";
import Logo from "../Assets/Febval.png";
import Facebook from "../Assets/Facebook.svg";
import Insta from "../Assets/Insta.svg";
import Twitter from "../Assets/Twitter.svg";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-contents">
          <div className="footer-logo">
            <img src={Logo} />
            <div className="tagline">
              <text>The joy of giving</text>
            </div>
          </div>
          <div className="footer-links">
            <text>Quick Links</text>
            <div className="Quick-links">
              <a href="#">Product</a>
              <a href="#">How does it work? </a>
              <a href="#">Pricing</a>
              <a href="#">Support</a>
              <a href="#">Report an issue</a>
              <a href="#">Wishlist</a>
            </div>
          </div>
          <div className="footer-sites">
            <text>Find us on</text>
            <div className="social-media">
              <img src={Facebook} alt="" />
              <img src={Insta}alt="" />
              <img src={Twitter} alt=""/>

            </div>
          </div>
        </div>
        <div className="copyright-container">
          <div className="copyright-items">
            <div className="footer-copyright-l">Copyright @2022 FEBVAL</div>
            <div className="footer-copyright-r">
              <text>Terms of Use</text>
              <text>Privacy Policy</text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
