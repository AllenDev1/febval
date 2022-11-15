import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useLocation } from "react-router-dom";
import "../Scss/Foryou.scss";
import AutoButton from "./AutoButton";
import Cardsgroup from "./Cardsgroup";
import da from "./data file/datafiles.json";

const Foryou = () => {
	const location = useLocation();
	const cat = location.pathname.split("/")[2];
	const [sort, SetSort] = useState("Sort");

	return (
		<>
			<Container className="card-container">
				<div className="feature-products d-flex justify-content-between">
					<p>Only For You</p>

					<Form.Select
						aria-label="Default select example"
						className="border-0 w-auto h-100"
						onChange={(e) => {
							SetSort(e.target.value);
						}}
					>
						<option>Sort</option>

						<option>Price: High to Low</option>
						<option>Price: Low to High</option>
					</Form.Select>
				</div>
				<Cardsgroup cat={cat} sort={sort} />
				<div className="seemore-btn">{AutoButton(da["see more"])}</div>
			</Container>
		</>
	);
};

export default Foryou;
