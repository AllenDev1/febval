import React, { useEffect, useState } from "react";
import {
	Container,
	Dropdown,
	Form,
	Nav,
	Navbar,
	Offcanvas,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
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

const Navbars = () => {
	const [user, setUser] = useState(null);
	const [modalShow, setModalShow] = useState(false);

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

	//search products by name
	// const [search, setSearch] = useState("");
	// const [searchResult, setSearchResult] = useState([]);

	// const handleSearch = (e) => {
	// 	e.preventDefault();
	// 	setSearch(e.target.value);
	// };

	// useEffect(() => {
	// 	const options = {
	// 		method: "GET",
	// 		url: "/api/search/products/" + search,
	// 	};

	// 	axios
	// 		.request(options)
	// 		.then(function (response) {
	// 			setSearchResult(response.data.products);
	// 		})
	// 		.catch(function (error) {
	// 			console.error(error);
	// 		});
	// }, []);

	return (
		<>
			<Navbar collapseOnSelect expand="lg" className="main-nav">
				<Container className="nav-container">
					<div className="always-on-nav" id="always-on-nav">
						<Navbar.Brand href="/" className="logo onBigscreen">
							<img src={logo} alt=".." />
						</Navbar.Brand>
						<div className="search-bar">
							<Form className="search-from">
								<input placeholder="Search Gifts..."></input>
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
													alt="..."
												/>
											</Dropdown.Toggle>

											<Dropdown.Menu>
												<Dropdown.Item href="/userdetails">
													<Link
														to={`/userdetails/${user?.googleId}`}
														className="text-decoration-none"
													>
														Profile
													</Link>
												</Dropdown.Item>
												<Dropdown.Item href="/userdetails">
													<Link
														to={`/userdetails/${user?.googleId}`}
														className="text-decoration-none"
													>
														Orders
													</Link>
												</Dropdown.Item>
												<Dropdown.Item
													onClick={() => {
														localStorage.clear();
														window.location.reload();
														window.open(
															"http://localhost:3001/auth/logout",
															"_self"
														);
													}}
												>
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
								>
									<img src={cake} alt="..." />
									Cakes
								</NavLink>
								<NavLink
									to="/products/wedding"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
								>
									<img src={wed} alt="..." />
									Wedding
								</NavLink>
								<NavLink
									to="/products/him"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
								>
									<img src={giftbox} alt="..." />
									Him
								</NavLink>
								<NavLink
									to="/products/her"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
								>
									<img src={giftbox} alt="..." />
									Her
								</NavLink>
								<NavLink
									to="/products/kids"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
								>
									<img src={giftbox} alt="..." />
									Kids
								</NavLink>
								<NavLink
									to="/products/birthday"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
								>
									<img src={giftbox} alt="..." />
									Birthday
								</NavLink>
								<NavLink
									to="/events"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
								>
									<img src={events} alt="..." />
									Events
								</NavLink>
								<NavLink
									to="/products/other"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
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
