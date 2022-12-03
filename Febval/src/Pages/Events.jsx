import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Gallery from "react-photo-gallery";
import { photos } from "../Components/data file/Photo.js";
import "../Scss/Events.scss";
import WhatsAppWidget from "react-whatsapp-chat-widget";
import "react-whatsapp-chat-widget/index.css";

const Events = () => {
	return (
		<>
			<Container className="events pb-5">
				<Row>
					<Col>
						<h1>Events</h1>
					</Col>
					<Col>
						<h2>Contact us</h2>
						<p>Phone: 0000000</p>
						<p>Email: @hahah</p>
					</Col>
				</Row>
				<Gallery photos={photos} />
			</Container>
			<WhatsAppWidget
				phoneNo="9779814767895"
				position="right"
				widgetWidth="300px"
				widgetWidthMobile="260px"
				autoOpen={true}
				autoOpenTimer={5000}
				messageBox={true}
				messageBoxTxt="Hi Team, is there any related service available ?"
				iconSize="50"
				iconColor="white"
				iconBgColor="tomato"
				headerIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/1024px-Circle-icons-chat.svg.png"
				headerIconColor="pink"
				headerTxtColor="black"
				headerBgColor="tomato"
				headerTitle="Rupesh Khadka"
				headerCaption="Online"
				bodyBgColor="#bbb"
				chatPersonName="Support"
				chatMessage={
					<>
						Hi there 👋 <br />
						<br /> How can I help you?
					</>
				}
				footerBgColor="#999"
				btnBgColor="yellow"
				btnTxtColor="black"
				btnTxt="Start Chat"
			/>
		</>
	);
};

export default Events;
