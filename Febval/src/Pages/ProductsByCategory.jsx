import React from "react";
import Cardsgroup from "../Components/Cardsgroup";
import { Container, Breadcrumb, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../Scss/productslistcat.scss";
import AutoButton from "../Components/AutoButton";
import da from "../Components/data file/datafiles.json";
import { useParams } from "react-router-dom";

const ProductsByCategory = () => {
	const location = useLocation();
	const whereAt = location.pathname.split("/")[2];
	const { cat } = useParams();
	const [sort, SetSort] = useState("new");

	return (
		<>
			<Container className="products-list-cat">
				<Row className="mb-5">
					<Col>
						<Breadcrumb>
							<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
							<Breadcrumb.Item active>{whereAt}</Breadcrumb.Item>
						</Breadcrumb>
					</Col>
					<Col>
						<Form.Select
							aria-label="Default select example"
							className="border-0 w-auto float-end"
							onChange={(e) => {
								SetSort(e.target.value);
							}}
						>
							<option value="new">Sort</option>
							<option value="high">Price: High to Low</option>
							<option value="low">Price: Low to High</option>
						</Form.Select>
					</Col>
				</Row>

				<Cardsgroup cat={cat} sort={sort} />

				<div className="seemore-btn d-flex justify-content-center py-5">
					{AutoButton(da["see more"])}
				</div>
			</Container>
		</>
	);
};

export default ProductsByCategory;
