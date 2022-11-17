import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../Scss/Sale.scss";

const Sale = () => {
	const [sale, setSale] = useState([]);

	const fetchSale = () => {
		const options = {
			method: "GET",
			url: "/api/salesbanner/",
		};

		axios
			.request(options)
			.then(function (response) {
				setSale(response.data.image);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	useEffect(() => {
		fetchSale();
	}, []);

	return (
		<>
			<Container>
				<div className="banner-container">
					{sale.slice(0, 1).map((_, idx) => (
						<img src={_.image} alt="..." key={idx} />
					))}
				</div>
			</Container>
		</>
	);
};

export default Sale;
