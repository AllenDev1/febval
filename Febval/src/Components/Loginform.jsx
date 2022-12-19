import React from "react";
import Modal from "react-bootstrap/Modal";
import logo from "../Assets/Company Name.svg";
import google from "../Assets/google.svg";
import img from "../Assets/image 6.svg";
import "../Scss/loginform.scss";

const Loginform = (props) => {
	return (
		<>
			<Modal
				{...props}
				size="sm"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				className="login-modal"
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						<img src={logo} alt=".." />
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="justify-content-center d-flex ">
					<img src={img} alt="..." className="w-100" />
				</Modal.Body>
				<Modal.Footer className="login-modal-footer">
					<a
						href="#"
						className="login-google"
						onClick={() => {
							window.open(
								"https://febval.onrender.com/auth/google",
								"_self"
							);
						}}
					>
						<img src={google} alt=".." /> Login with Google
					</a>

					<p className="footer-text">
						If you continue, you are accepting FEBVAL{" "}
						<a href="/terms"> Terms and Conditions </a>and{" "}
						<a href="/terms"> Privacy Policy.</a>
					</p>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Loginform;
