import React from "react";
import { Navigate } from "react-router-dom";
import Footer from "../Components/footer";
import Personalinfo from "../Components/Personalinfo";

const Userdetail = ({ user }) => {
	return <>{user ? <Personalinfo user={user} /> : <Navigate to="/home" />}</>;
};

export default Userdetail;
