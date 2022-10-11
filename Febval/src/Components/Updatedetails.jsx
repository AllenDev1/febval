import React from "react";
import "../Scss/updatedetails.scss";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Updatedetails = (props) => {
	return (
		<>
			<Modal
				{...props}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						<text>Personal Details</text>
					</Modal.Title>
				</Modal.Header>
				<div className="update-details">
					<div className="update-container">
						<div className="form-fill">
							<form>
								<label>
									Enter your full name*
									<br />
									<input type="text" />
								</label>
								<label>
									Enter Email*
									<br />
									<input type="text" />
								</label>
								<label>
									Enter Phone Number*
									<br />
									<input type="number" />
								</label>
								<label>
									Enter Address*
									<br />
									<input type="text" />
								</label>
							</form>
						</div>
						<checkbox />
						<div className="footer-text">
							<Form.Check aria-label="option 1" />
							<p>
								You agree to the{" "}
								<a href="/"> Terms and Conditions </a>
							</p>
						</div>

						<button>Update</button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Updatedetails;
