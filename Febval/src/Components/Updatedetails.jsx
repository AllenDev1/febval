import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "../Scss/updatedetails.scss";

const Updatedetails = (props) => {
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const user = props.user;
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const updateInfo = (e) => {
		e.preventDefault();

		const options = {
			method: "POST",
			url: "/api/user/info",

			data: {
				phone: phone,
				address: address,
			},
		};

		axios
			.request(options)
			.then(function (response) {})
			.catch(function (error) {
				console.error(error);
			});
	};

	//update user data after update

	// useEffect(() => {
	// 	const options = {
	// 		method: "GET",
	// 		url: "/api/user/info",

	// 	};

	// 	axios

	// 		.request(options)
	// 		.then(function (response) {
	// 			setPhone(response.data.phone);
	// 			setAddress(response.data.address);
	// 		})
	// 		.catch(function (error) {
	// 			console.error(error);
	// 		});
	// }, []);

	return (
		<>
			<Modal
				{...props}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						<p>Personal Details</p>
					</Modal.Title>
				</Modal.Header>
				<div className="update-details">
					<div className="update-container">
						<div className="form-fill">
							<form onSubmit={updateInfo}>
								<label>
									Enter Phone Number*
									<br />
									<input
										type="number"
										placeholder={user?.phone}
										value={phone}
										onChange={(e) => {
											setPhone(e.target.value);
										}}
										required
									/>
								</label>
								<label>
									Enter Address*
									<br />
									<input
										placeholder={user?.address}
										value={address}
										type="text"
										onChange={(e) => {
											setAddress(e.target.value);
										}}
										required
									/>
								</label>
								<Button
									variant="light"
									type="submit"
									onClick={() => {
										handleShow();
										window.location.reload();
									}}
								>
									Update
								</Button>
							</form>
						</div>
					</div>
				</div>
			</Modal>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Your informations have updated. </Modal.Title>
				</Modal.Header>
			</Modal>
		</>
	);
};

export default Updatedetails;
