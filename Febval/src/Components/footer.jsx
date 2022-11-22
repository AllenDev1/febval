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
								<a href="/">Product</a>
								<a href="terms">How does it work? </a>

								<a href="mailto:someone@example.com">Support</a>
								<a href="mailto:someone@example.com">
									Report an issue
								</a>
								<a href="mailto:someone@example.com">
									Wishlist
								</a>
							</div>
						</div>
						<div className="footer-sites">
							<p>Find us on</p>
							<div className="social-media">
								<a href="https://www.facebook.com/profile.php?id=100085282614251" target="_blank">
									<img src={Facebook} alt=".." />
								</a>
								<a href="https://www.instagram.com/invites/contact/?i=1drk72b2e029d&utm_content=pbnjodb" target="_blank">
									<img src={Insta} alt=".." />
								</a>
								<a href="https://twitter.com/Febvalgifts?t=k97eoefKw4BQRMUHjRp_Jg&s=08" target="_blank">
									<img src={Twitter} alt=".." />
								</a>
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
								<a href="/terms">
									<p>Terms of Use</p>
								</a>
								<a href="/terms">
									<p>Privacy Policy</p>
								</a>
							</div>
						</div>
					</Container>
				</div>
			</div>
		</>
	);
};

export default Footer;
