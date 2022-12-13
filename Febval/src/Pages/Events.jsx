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
						<h1>
							<ins>Events</ins>
						</h1>
					</Col>
				</Row>
				<Gallery photos={photos} />
			</Container>

			<WhatsAppWidget
				phoneNo="9779863684870"
				position="right"
				widgetWidth="300px"
				widgetWidthMobile="260px"
				autoOpen={true}
				autoOpenTimer={5000}
				messageBox={true}
				messageBoxTxt="Hi Team, is there any related service available ?"
				iconSize="50"
				iconColor="white"
				iconBgColor="#25D366"
				headerIcon="https://cdn-icons-png.flaticon.com/512/8377/8377198.png"
				headerIconColor="#25D366"
				headerTxtColor="black"
				headerBgColor="#25D366"
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
				btnBgColor="#25D366"
				btnTxtColor="white"
				btnTxt="Start Chat"
			/>
		</>
	);
};

export default Events;
