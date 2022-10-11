import React,{useState} from "react";
import "../Scss/personalinfo.scss";
import { Container, Button } from "react-bootstrap";
import Order from "../Assets/order.svg";
import Updatedetails from "./Updatedetails";

const Personalinfo = () => {
	const [modalShow, setModalShow] = useState(false);

	return (
		<>
			<Container>
				<div className="info-container">
					<div className="manage-account">
						<h1>Manage My Account</h1>
						<div className="detail-container">
							<div className="personal-details">
								<div className="details">
									<text>Personal Details</text>
									<div className="personal-name">
										Rupesh dai
									</div>
									<div className="personal-email">
										Khaik@hgmail.com
									</div>
									<div className="personal-number">
										9800000000
									</div>
									<div className="edit-det"><Button onClick={() => setModalShow(true)}>
											EDIT
										</Button></div>
								</div>
							</div>
							<div className="address-book">
								<div className="address">
									<h1>Address Book</h1>
									<h2>
										Adderss Book new road, makhan galli -
										30, kathmandu
									</h2>
									<div className="edit-det">
										<Button onClick={() => setModalShow(true)}>
											EDIT
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="order-container">
						<div className="Recent-orders">
							<h1>Recent Orders</h1>
							<div className="order-titles">
								<text>Orders</text>
								<text>Placed on</text>
								<text>Items</text>
								<text>Total</text>
							</div>
							<div className="order-data">
								<text>14555</text>
								<text>2020/3/4</text>
								<img src={Order} alt="" />
								<text>Total</text>
							</div>
							<div className="order-data">
								<text>1555</text>
								<text>2020/3/4</text>
								<img src={Order} alt="" />
								<text>Total</text>
							</div>
							<div className="order-data">
								<text>12345</text>
								<text>2020/3/4</text>
								<img src={Order} alt="" />
								<text>Total</text>
							</div>
						</div>
					</div>
				</div>
			</Container>
			<Updatedetails
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</>
	);
};

export default Personalinfo;
