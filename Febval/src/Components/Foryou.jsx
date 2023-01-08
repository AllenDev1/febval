import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../Scss/Foryou.scss";
import Cardsgroup from "./Cardsgroup";

const Foryou = () => {
	const { cat } = useParams();
	const [sort, SetSort] = useState("new");

	return (
		<>
			<Container className="card-container">
				<div className="feature-products d-flex justify-content-between flex-wrap mb-5 ">
					<p>Only For You</p>

					<Form.Select
						aria-label="Default select example"
						className="border-0  h-100 sort-select"
						onChange={(e) => {
							SetSort(e.target.value);
						}}
					>
						<option value="new">Sort</option>

						<option value="high"> High to Low</option>
						<option value="low"> Low to High</option>
					</Form.Select>
				</div>
				<Cardsgroup sort={sort} cat={cat} />
			</Container>
		</>
	);
};

export default Foryou;
