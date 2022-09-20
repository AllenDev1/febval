import React from "react";
import "../Scss/navbar.scss";
import "../Scss/offcanvasmenu.scss";
import { Container, Navbar, Nav, Offcanvas, Form } from "react-bootstrap";
import logo from "../Assets/Company Name.svg";
import signin from "../Assets/signin.svg";
import cart from "../Assets/cart.svg";
import cake from "../Assets/gift shop/cakes.svg";
import wed from "../Assets/gift shop/wed.svg";
import giftbox from "../Assets/gift shop/giftbox.svg";
import other from "../Assets/gift shop/other.svg";
import Loginform from "./Loginform";

const NavBar = () => {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<>
			<Navbar collapseOnSelect expand="lg" className="main-nav">
				<Container className="nav-container">
					<div className="always-on-nav">
						<Navbar.Brand href="/" className="logo">
							<img src={logo} alt=".." />
						</Navbar.Brand>
						<div className="search-bar">
							<Form className="search-from">
								<input placeholder="Search Gifts..."></input>
							</Form>
						</div>
						<div className="cart-sign-div">
							<Nav.Link
								href="#"
								className="sign-in"
								onClick={() => setModalShow(true)}
							>
								Sign In
								<img src={signin} alt=".." />
							</Nav.Link>
							{/* <Nav.Link href="#c" className="cart-link">
								<img src={cart} alt="..." />
							</Nav.Link> */}

							<Nav.Link href="#c" className="cart-link">
								<img src={cart} alt="..." />
								<div className="num-0f-items-cart">
									<span>2</span>{" "}
								</div>
							</Nav.Link>
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
							<Nav className="me-auto buttom-nav">
								<Nav.Link href="#features">
									<img src={cake} alt="..." />
									Cakes
								</Nav.Link>
								<Nav.Link href="#pricing">
									<img src={wed} alt="..." />
									Wedding
								</Nav.Link>
								<Nav.Link href="#pricing">
									<img src={giftbox} alt="..." />
									Him
								</Nav.Link>
								<Nav.Link href="#pricing">
									<img src={giftbox} alt="..." />
									Her
								</Nav.Link>
								<Nav.Link href="#pricing">
									<img src={giftbox} alt="..." />
									Kids
								</Nav.Link>
								<Nav.Link href="#pricing">
									<img src={giftbox} alt="..." />
									Birthday
								</Nav.Link>
								<Nav.Link href="#pricing">
									<img src={other} alt="..." />
									Others
								</Nav.Link>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
			<Loginform show={modalShow} onHide={() => setModalShow(false)} />
		</>
	);
};

export default NavBar;
