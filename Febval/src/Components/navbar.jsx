import React, { useEffect, useState } from "react";
import { Container, Form, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import cart from "../Assets/cart.svg";
import logo from "../Assets/Company Name.svg";
import cake from "../Assets/gift shop/cakes.svg";
import giftbox from "../Assets/gift shop/giftbox.svg";
import other from "../Assets/gift shop/other.svg";
import wed from "../Assets/gift shop/wed.svg";
import signin from "../Assets/signin.svg";
import "../Scss/navbar.scss";
import "../Scss/offcanvasmenu.scss";
import Cart from "./Cart";
import Loginform from "./Loginform";
import { useAuth0 } from "@auth0/auth0-react";

const Navbars = () => {
	const { loginWithRedirect } = useAuth0();
	const { getAccessTokenSilently } = useAuth0();

	const [modalShow, setModalShow] = useState(false);

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

	return (
		<>
			<Navbar collapseOnSelect expand="lg" className="main-nav">
				<Container className="nav-container">
					<div className="always-on-nav" id="always-on-nav">
						<Navbar.Brand href="/" className="logo">
							<img src={logo} alt=".." />
						</Navbar.Brand>
						<div className="search-bar">
							<Form className="search-from">
								<input placeholder="Search Gifts..."></input>
							</Form>
						</div>
						<div className="cart-sign-div">
							<NavLink
								className="sign-in"
								onClick={() => {
									loginWithRedirect();
								}}
							>
								Sign In
								<img src={signin} alt=".." />
							</NavLink>
							{/* <NavLink to="#c" className="cart-link">
								<img src={cart} alt="..." />
							</NavLink> */}

							<NavLink
								className="cart-link"
								onClick={async () => {
									// setShow(true);
									try {
										const token =
											await getAccessTokenSilently({
												audience: "https://febval-api",
												scope: "full:admin"
											});
										console.log(token);
									} catch (e) {
										console.error(e);
									}
								}}
							>
								<img src={cart} alt="..." />
								<div className="num-0f-items-cart">
									<span>2</span>{" "}
								</div>
							</NavLink>
						</div>

						<Navbar.Toggle
							aria-controls="offcanvasNavbar-expand-sm"
							className="menu-btn"
						/>
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
									to="/navcategory"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
								>
									<img src={cake} alt="..." />
									Cakes
								</NavLink>
								<NavLink
									to="/wedding"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
								>
									<img src={wed} alt="..." />
									Wedding
								</NavLink>
								<NavLink
									to="/him"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
								>
									<img src={giftbox} alt="..." />
									Him
								</NavLink>
								<NavLink
									to="/her"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
								>
									<img src={giftbox} alt="..." />
									Her
								</NavLink>
								<NavLink
									to="/kids"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
								>
									<img src={giftbox} alt="..." />
									Kids
								</NavLink>
								<NavLink
									to="/birthday"
									className={({ isActive }) =>
										isActive ? "active" : ""
									}
								>
									<img src={giftbox} alt="..." />
									Birthday
								</NavLink>
								<NavLink
									to="/other"
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
