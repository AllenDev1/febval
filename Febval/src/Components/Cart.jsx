import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import Checkout from "../Assets/Checkout.svg";
import Delete from "../Assets/delete.svg";
import Shop from "../Assets/Shopp.svg";
import "../Scss/Cart.scss";
import { useSelector, useDispatch } from "react-redux";

const Cart = (props) => {
	const cartProducts = useSelector((state) => state.cart.products);
	const navigate = useNavigate();

	return (
		<>
			<Offcanvas placement="end" backdrop="static" {...props}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>
						<h1>Cart</h1>
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<div className="cart-container">
						<div className="cart-contents">
							<div className="cart-item-container">
								{cartProducts?.map((_, idx) => {
									return (
										<div className="cart-items" key={idx}>
											<div className="item-details">
												<h2>{_.product?.name}</h2>
												<img
													src={
														_.product
															.productImages[0]
															.image
													}
													alt="..."
												/>
											</div>
											<div className="calculation">
												<div className="first-row float-right d-flex justify-content-between">
													<p>
														Quantity: {_.quantity}
													</p>
													<p className="text-right">
														Rs. {_.product.price} +
														150(shipping)
													</p>
												</div>
												<div className="second-row">
													<p>Total:</p>
													<p>
														<s>
															{" "}
															Rs.{" "}
															{(_.product.price +
																150) *
																_.quantity}{" "}
															/-{" "}
														</s>
													</p>
													<p>
														Rs.{" "}
														{(_.product.discount +
															150) *
															_.quantity}{" "}
														/-
													</p>
												</div>
											</div>
											<img
												src={Delete}
												alt=""
												className="del"
											/>
											<div className="cart-buttons">
												<button>
													<img
														src={Checkout}
														alt=""
													/>
													<p>Checkout</p>
												</button>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</Offcanvas.Body>
				<div className="cart-footer">
					<div className="item-total">
						<p>{cartProducts.length} items</p>
						<p>
							Subtotal : Rs.
							{cartProducts.reduce(
								(acc, curr) =>
									acc +
									(curr.product.discount + 150) *
										curr.quantity,
								0
							)}
							/-
						</p>
					</div>
				</div>
				<div className="button-footer">
					<button>
						<img src={Checkout} alt="" />
						<p>Checkout</p>
					</button>
					<button
						className="shop"
						onClick={() => {
							let path = `/`;
							navigate(path);
						}}
					>
						<img src={Shop} alt="" />
						<p>Continue Shopping</p>
					</button>
				</div>
			</Offcanvas>
		</>
	);
};

export default Cart;
