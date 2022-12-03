import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import sendicon from "../Assets/send.svg";
import "../Scss/email.scss";

const Email = () => {
	const [email, setEmail] = useState();
	const [error, setError] = useState(null);

	const postEmail = () => {
		const options = {
			method: "POST",
			url: "/mail",
			headers: { "Content-Type": "application/json" },
			data: { email: email },
		};
	};

	function isValidEmail(email) {
		return /\S+@\S+\.\S+/.test(email);
	}
	return (
		<>
			<div className="bg-email">
				<Container className="email-container">
					<Row className="email-row">
						<Col className="newsletter-col mb-3">
							<h1>Newsletter</h1>
							<p>
								Join our Newsletter to receive information abut
								the latest Products, Discounts and Offers
							</p>
						</Col>
						<Col className="sub-col">
							<Form onSubmit={postEmail} className="email-fomr">
								<input
									type="email"
									placeholder="Your email address"
									value={email}
									onChange={(e) => {
										if (!isValidEmail(e.target.value)) {
											setError("Email is invalid");
										} else {
											setError(null);
										}

										setEmail(e.target.value);
									}}
									required
								/>
								<Button type="submit">
									Subscribe <img src={sendicon} alt="..." />
								</Button>

							</Form>
							{error && console.log(error)}

						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};

export default Email;
