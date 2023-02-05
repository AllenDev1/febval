import React from "react";
import { Container, Modal, Button } from "react-bootstrap";

const OrderCompltedModel = (props) => {
	return (
		<>
			<Container>
				<Modal
					{...props}
					size="sm"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter " className="text-success">
							Your Order is Placed
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h5>
							Your order has been successfully placed and is being
							processed.
						</h5>
						<p>
							Thank you for shopping with us. If you have any
							questions about your order, please don't hesitate to
							contact us by clicking on the whatsapp icon.
						</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={props.onHide} variant="success">
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</Container>
		</>
	);
};

export default OrderCompltedModel;
