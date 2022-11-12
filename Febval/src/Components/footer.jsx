import React from "react";
import "../Scss/footer.scss";
import Logo from "../Assets/Febval.png";
import Facebook from "../Assets/Facebook.svg";
import Insta from "../Assets/Insta.svg";
import Twitter from "../Assets/Twitter.svg";
import { Container } from "react-bootstrap";

const Footer = () => {
	return (
		<>
			<div className="footer-container">
				<Container className="container-footer">
					<div className="footer-contents">
						<div className="footer-logo">
							<img src={Logo} />
							<div className="tagline">
								<p>The joy of giving</p>
							</div>
						</div>
						<div className="footer-links">
							<p>Quick Links</p>
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
							<p>Find us on</p>
							<div className="social-media">
								<img src={Facebook} alt="" />
								<img src={Insta} alt="" />
								<img src={Twitter} alt="" />
							</div>
						</div>
					</div>
				</Container>
				<div className="copyright-container">
					<Container>
						<div className="copyright-items">
							<div className="footer-copyright-l">
								Copyright @2022 FEBVAL
							</div>
							<div className="footer-copyright-r">
								<p>Terms of Use</p>
								<p>Privacy Policy</p>
							</div>
						</div>
					</Container>
				</div>
			</div>
		</>
	);
};

export default Footer;
