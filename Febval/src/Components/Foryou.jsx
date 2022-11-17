import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import "../Scss/Foryou.scss";
import AutoButton from "./AutoButton";
import Cardsgroup from "./Cardsgroup";
import da from "./data file/datafiles.json";

const Foryou = () => {
	const { cat } = useParams();
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
						<option value="new">Sort</option>

						<option value="high">Price: High to Low</option>
						<option value="low">Price: Low to High</option>
					</Form.Select>
				</div>
				<Cardsgroup sort={sort} cart= {cat} />
				<div className="seemore-btn">{AutoButton(da["see more"])}</div>
			</Container>
		</>
	);
};

export default Foryou;
