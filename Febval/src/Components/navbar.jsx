import React, { useEffect, useState } from "react";
import {
	Container,
	Dropdown,
	Form,
	Nav,
	Navbar,
	Offcanvas,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import cart from "../Assets/cart.svg";
import logo from "../Assets/Company Name.svg";
import events from "../Assets/events.svg";
import cake from "../Assets/gift shop/cakes.svg";
import giftbox from "../Assets/gift shop/giftbox.svg";
import other from "../Assets/gift shop/other.svg";
import wed from "../Assets/gift shop/wed.svg";
import signin from "../Assets/signin.svg";
import { getUser } from "../Auth/auth";
import "../Scss/navbar.scss";
import "../Scss/offcanvasmenu.scss";
import Cart from "./Cart";
import Loginform from "./Loginform";
import { useSelector } from "react-redux";
import axios from "axios";
import logoutlogo from "../Assets/gift shop 2/Vector-1.svg";
import profileLogo from "../Assets/gift shop 2/Vector.svg";
import SearchPage from "./SearchPage";

const Navbars = () => {
	const [user, setUser] = useState(null);
	const [modalShow, setModalShow] = useState(false);
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const cartProductsNumber = useSelector((state) => state.cart.products);

	const [show, setShow] = useState(false);

	const listenScrollEvent = (event) => {
		if (window.scrollY < 30) {
			document.getElementById("buttom-nav").style.display = "flex";
		} else if (window.scrollY > 30) {
			document.getElementById("buttom-nav").style.display = "none";
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", listenScrollEvent);
		return () => window.removeEventListener("scroll", listenScrollEvent);
	}, []);

	useEffect(() => {
		getUser()
			.then((user) => {
				setUser(user);
			})
			.catch((err) => {
				setUser(null);
			});
	}, []);

	return (
		<>
			<Navbar collapseOnSelect expand="lg" className="main-nav">
				<Container className="nav-container">
					<div className="always-on-nav" id="always-on-nav">
						<Navbar.Brand href="/" className="logo onBigscreen">
							<img src={logo} alt=".." />
						</Navbar.Brand>
						<div className="search-bar">
							<Form
								className="search-from"
								onSubmit={(e) => {
									e.preventDefault();
									navigate(`/search/${search}`);
								}}
							>
								<input
									placeholder="Search Gifts..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								></input>
							</Form>
						</div>
						<div className="searchbarAndLogo">
							<Navbar.Brand
								href="/"
								className="logo onSmallscreen"
							>
								<img src={logo} alt=".." />
							</Navbar.Brand>
							<div className="cart-sign-div">
								{user ? (
									<>
										<Dropdown className="cart-link user-image">
											<Dropdown.Toggle
												variant="white"
												id="dropdown-basic"
											>
												<img
													src={user?.image}
													alt={user.name}
												/>
											</Dropdown.Toggle>

											<Dropdown.Menu className="dropdown">
												<Dropdown.Item href="/userdetails">
													<Link
														to={`/userdetails/${user?.googleId}`}
														className="text-decoration-none text-dark"
													>
														<img
															src={profileLogo}
															alt=".."
														/>
														Profile
													</Link>
												</Dropdown.Item>
												<Dropdown.Item
													onClick={() => {
														localStorage.clear();
														window.location.reload();
														window.open(
															`${process.env.REACT_APP_URL}/auth/logout`,
															"_self"
														);
													}}
												>
													<img
														src={logoutlogo}
														alt=""
													/>
													Logout
												</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>

										<NavLink
											className="cart-link"
											onClick={() => {
												setShow(true);
											}}
										>
											<img
												src={cart}
												alt="..."
												className="cartimg"
											/>
											<div className="num-0f-items-cart">
												<span>
													{cartProductsNumber.length}
												</span>
											</div>
										</NavLink>
									</>
								) : (
									<>
										<NavLink
											className="sign-in"
											onClick={() => {
												setModalShow(true);
											}}
										>
											Sign In
											<img src={signin} alt=".." />
										</NavLink>
									</>
								)}
								<Navbar.Toggle
									aria-controls="offcanvasNavbar-expand-sm"
									className="menu-btn"
								/>
							</div>
						</div>
					</div>
					<Navbar.Offcanvas
						id="offcanvasNavbar-expand-sm"
						className="bottom-menu"
						aria-labelledby="offcanvasNavbarLabel-expand-sm"
						placement="end"
					>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
								<img src={logo} alt=".." />
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body className="menu-body">
							<Nav className="me-auto buttom-nav" id="buttom-nav">
								<NavLink
									to="/products/cake"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
									//onclick closeButton offcanvas
									onClick={() => {
										document
											.getElementById("navbar-collapse")
											.classList.remove("show");
									}}
								>
									<img src={cake} alt="..." />
									Cakes
								</NavLink>
								<NavLink
									to="/products/wedding"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
									onClick={() => {
										document
											.getElementById("navbar-collapse")
											.classList.remove("show");
									}}
								>
									<img src={wed} alt="..." />
									Wedding
								</NavLink>
								<NavLink
									to="/products/him"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
									onClick={() => {
										document
											.getElementById("navbar-collapse")
											.classList.remove("show");
									}}
								>
									<img src={giftbox} alt="..." />
									Him
								</NavLink>
								<NavLink
									to="/products/her"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
									onClick={() => {
										document
											.getElementById("navbar-collapse")
											.classList.remove("show");
									}}
								>
									<img src={giftbox} alt="..." />
									Her
								</NavLink>
								<NavLink
									to="/products/kids"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
									onClick={() => {
										document
											.getElementById("navbar-collapse")
											.classList.remove("show");
									}}
								>
									<img src={giftbox} alt="..." />
									Kids
								</NavLink>
								<NavLink
									to="/products/birthday"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
									onClick={() => {
										document
											.getElementById("navbar-collapse")
											.classList.remove("show");
									}}
								>
									<img src={giftbox} alt="..." />
									Birthday
								</NavLink>
								<NavLink
									to="/events"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
									onClick={() => {
										document
											.getElementById("navbar-collapse")
											.classList.remove("show");
									}}
								>
									<img src={events} alt="..." />
									Events
								</NavLink>
								<NavLink
									to="/products/other"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
									onClick={() => {
										document
											.getElementById("navbar-collapse")
											.classList.remove("show");
									}}
								>
									<img src={other} alt="..." />
									Others
								</NavLink>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
			<Loginform show={modalShow} onHide={() => setModalShow(false)} />

			<Cart show={show} onHide={() => setShow(false)} />
		</>
	);
};

export default Navbars;
