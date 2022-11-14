import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import logo from "../assets/Febval.png";
import Dummy from "../pages/Dummy";
import "../scss/sidebar.scss";

const Sidebar = () => {
	return (
		<>
			<Tab.Container id="left-tabs-example" defaultActiveKey="first" className="sidebar">
				<Row className="sidebarRow">
					<Col sm={3} className="sidebarCol">
						<Nav variant="pills" className="flex-column sidebarNav">
							<Nav.Item>
								<Nav.Link>
									<img src={logo} alt="..." />
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="first" className="bg-none">Dashboard</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="second">Products</Nav.Link>
							</Nav.Item>
                            <Nav.Item>
								<Nav.Link eventKey="second">Tab 2</Nav.Link>
							</Nav.Item>
                            <Nav.Item>
								<Nav.Link eventKey="second">Tab 2</Nav.Link>
							</Nav.Item>
                            <Nav.Item>
								<Nav.Link eventKey="second">Tab 2</Nav.Link>
							</Nav.Item>
                            <Nav.Item>
								<Nav.Link eventKey="second">Tab 2</Nav.Link>
							</Nav.Item>
                            <Nav.Item>
								<Nav.Link eventKey="second">Tab 2</Nav.Link>
							</Nav.Item>
                            <Nav.Item>
								<Nav.Link eventKey="second">Tab 2</Nav.Link>
							</Nav.Item>
						</Nav>
					</Col>
					<Col sm={9}>
						<Tab.Content>
							<Tab.Pane eventKey="first">
								<Dummy />
							</Tab.Pane>
							<Tab.Pane eventKey="second">
								{/* <Sonnet /> */}
							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</>
	);
};

export default Sidebar;
