import React,{useState} from "react";
import "../Scss/Cart.scss";
import Modal from "react-bootstrap/Modal";
import Cross from "../Assets/cross.svg";
import Delete from "../Assets/delete.svg";
import Checkout from "../Assets/Checkout.svg";
import Shop from "../Assets/Shopp.svg";
import { Offcanvas } from "react-bootstrap";

const Cart = (  props ) => {
	
	return (
		<>
			<Offcanvas  placement="end" backdrop="static" {...props}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>
						<h1>Cart</h1>
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<div className="cart-container">
						<div className="cart-contents">
							<div className="cart-item-container">
								<div className="cart-items">
									<div className="item-details">
										<h2>Morgan</h2>
										<img src="" alt="" />
									</div>
									<div className="calculation">
										<div className="first-row">
											<text>14th aug, 2022</text>
											<text>Rs. 7500 + 200</text>
										</div>
										<div className="second-row">
											<text>Total:</text>
											<text>Rs. 7700 /-</text>
											<text>Rs. 7100 /-</text>
										</div>
									</div>
									<img src={Delete} alt="" className="del" />
									<div className="cart-buttons">
										<button>
											<img src={Checkout} alt="" />
											<text>Checkout</text>
										</button>
									</div>
								</div>
								<div className="cart-items">
									<div className="item-details">
										<h2>Morgan</h2>
										<img src="" alt="" />
									</div>
									<div className="calculation">
										<div className="first-row">
											<text>14th aug, 2022</text>
											<text>Rs. 7500 + 200</text>
										</div>
										<div className="second-row">
											<text>Total:</text>
											<text>Rs. 7700 /-</text>
											<text>Rs. 7100 /-</text>
										</div>
									</div>
									<img src={Delete} alt="" className="del" />
									<div className="cart-buttons">
										<button>
											<img src={Checkout} alt="" />
											<text>Checkout</text>
										</button>
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</Offcanvas.Body>
				<div className="cart-footer">
							<div className="item-total">
								<text>2 items</text>
								<text>Subtotal : Rs 14200/-</text>
							</div>
						
						</div>
				<div className="button-footer">
								<button>
									<img src={Checkout} alt="" />
									<text>Checkout</text>
								</button>
								<button className="shop">
									<img src={Shop} alt="" />
									<text>Continue Shopping</text>
								</button>
							</div>
			</Offcanvas>
			
		</>
	);
};

export default Cart;
