import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./Components/footer";
import Navbars from "./Components/navbar";
import Personalinfo from "./Components/Personalinfo";
import Description from "./Pages/Description";
import Home from "./Pages/home";
import ProductsByCategory from "./Pages/ProductsByCategory";
import Events from "./Pages/Events";
import Terms from "./Pages/Terms";
import Pagenotfound from "./Pages/Pagenotfound";
import WhatsAppWidget from "react-whatsapp-chat-widget";
import "react-whatsapp-chat-widget/index.css";
const App = () => {
	return (
		<>
			<Router>
				<Navbars />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/home" element={<Home />} />
					<Route path="/userdetails/:id" element={<Personalinfo />} />

					<Route
						path="/products/:cat"
						element={<ProductsByCategory />}
					/>
					<Route path="events" element={<Events />} />
					<Route
						path="/description/:id/:name"
						element={<Description />}
					/>
					<Route path="terms" element={<Terms />} />

					<Route path="*" element={<Pagenotfound />} />
				</Routes>
			</Router>
			<Footer />
			<WhatsAppWidget
				phoneNo="9813860595"
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
				headerTitle="Gift Nepal"
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

export default App;
