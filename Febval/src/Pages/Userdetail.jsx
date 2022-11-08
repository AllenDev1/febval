import React from "react";
import Navbars from "../Components/navbar";
import Footer from "../Components/footer";
import Personalinfo from "../Components/Personalinfo";
import { Navigate } from "react-router-dom";

const Userdetail = ({ user }) => {
	return (
		<>
			{user ? <Personalinfo user={user} /> : <Navigate to="/home" />}
			<Footer />
		</>
	);
};

export default Userdetail;
