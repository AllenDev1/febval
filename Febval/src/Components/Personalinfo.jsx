import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Order from "../Assets/order.svg";
import { getUser } from "../Auth/auth";
import "../Scss/personalinfo.scss";
import Updatedetails from "./Updatedetails";
import axios from "axios";

const Personalinfo = () => {
	const [user, setUser] = useState(null);
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [modalShow, setModalShow] = useState(false);
	const navigate = useNavigate();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		getUser()
			.then((user) => {
				setUser(user);
			})
			.catch((err) => {
				setUser(null);
				navigate("/");
			});
	}, []);

	useEffect(() => {
		const options = {
			method: "GET",
			url: "/api/user/info",
		};

		axios
			.request(options)
			.then(function (response) {
				setPhone(response.data.user.phone);
				setAddress(response.data.user.address);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		const options = {
			method: "GET",
			url: "/api/order/orders",
		};

		axios
			.request(options)
			.then(function (response) {
				setOrders(response.data.orders);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, []);

	const formatDate = (createdAt) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(createdAt).toLocaleDateString(undefined, options);
	};

	return (
		<>
			<Container>
				<div className="info-container">
					<div className="manage-account">
						<h1>Manage My Account</h1>
						<div className="detail-container">
							<div className="personal-details">
								<div className="details">
									<p>Personal Details</p>
									<div className="personal-name">
										{user ? user.firstName : "Loading..."}
									</div>
									<div className="personal-email">
										{user ? user.email : "Loading..."}
									</div>
								</div>
							</div>
							<div className="address-book">
								<div className="address">
									<h1>Address Book</h1>
									<h2>{user ? address : "Loading..."}</h2>
									<div className="personal-number text-white">
										{user ? phone : "Loading..."}
									</div>
									<div className="edit-det">
										<Button
											onClick={() => setModalShow(true)}
										>
											EDIT
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="order-container">
						<Table striped bordered hover responsive>
							<thead>
								<tr>
									<th>Order#</th>
									<th>Placed on</th>
									<th>Items</th>
									<th>Total</th>
								</tr>
							</thead>
							{orders ? (
								orders?.map((order, idx) => {
									return (
										<>
											<tbody key={idx}>
												<tr>
													<td>{order.id}</td>
													<td>
														{formatDate(
															order.createdAt
														)}
													</td>
													<td>
														{order.Products[0].name}
													</td>

													<td>
														Rs.
														{
															order.Products[0]
																.price
														}
													</td>
												</tr>
											</tbody>
										</>
									);
								})
							) : (
								<h1>Loading...</h1>
							)}
						</Table>
					</div>
				</div>
			</Container>
			<Updatedetails
				show={modalShow}
				user={user}
				onHide={() => setModalShow(false)}
			/>
		</>
	);
};

export default Personalinfo;
