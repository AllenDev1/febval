import React, { useState } from "react";
import { Breadcrumb, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import Cardsgroup from "../Components/Cardsgroup";
import "../Scss/productslistcat.scss";

const ProductsByCategory = () => {
	const location = useLocation();
	const whereAt = location.pathname.split("/")[2];
	const { cat } = useParams();
	const [sort, SetSort] = useState("new");

	return (
		<>
			<Container className="products-list-cat">
				<Col>
					<Breadcrumb>
						<Breadcrumb.Item href="/">Home</Breadcrumb.Item>

						<Breadcrumb.Item active>{whereAt}</Breadcrumb.Item>
					</Breadcrumb>
				</Col>
				<Row className="mb-5">
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
			</Container>
		</>
	);
};

export default ProductsByCategory;
