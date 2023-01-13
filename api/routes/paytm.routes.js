const route = require("express").Router();
const { ensureAdmin } = require("../middlewares/Auth.js");
const paytmChecksum = require("../PaytmChecksum");
const uuid = require("uuid").v4;
const formidable = require("formidable");

// route.post("/payment", (req, res) => {
// 	const { amount, email, phone } = req.body;

// 	const paytmParams = {};
// 	paytmParams["MID"] = process.env.MID;
// 	paytmParams["WEBSITE"] = process.env.WEBSITE;
// 	paytmParams["CHANNEL_ID"] = process.env.CHANNEL_ID;
// 	paytmParams["INDUSTRY_TYPE_ID"] = process.env.INDUSTRY_TYPE_ID;
// 	paytmParams["ORDER_ID"] = uuid();
// 	paytmParams["CUST_ID"] = process.env.CUST_ID;
// 	paytmParams["TXN_AMOUNT"] = amount;
// 	paytmParams["CALLBACK_URL"] = process.env.CALLBACK_URL;
// 	paytmParams["EMAIL"] = email;
// 	paytmParams["MOBILE_NO"] = phone;

// 	/**
// 	 * Generate checksum by parameters we have
// 	 * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
// 	 */
// 	var paytmChecksum = paytmChecksum.generateSignature(
// 		paytmParams,
// 		process.env.MERCHANT_KEY
// 	);
// 	paytmChecksum
// 		.then(function (checksum) {
// 			console.log("generateSignature Returns: " + checksum);
// 			let paytmParams = {
// 				...paytmParams,
// 				CHECKSUMHASH: checksum,
// 			};
// 			res.json(paytmParams);
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// });

// route.post("/callback", (req, res) => {
// 	const form = new formidable.IncomingForm();
// 	form.parse(req, (err, fields, files) => {
// 		paytmChecksum = fields.CHECKSUMHASH;
// 		delete fields.CHECKSUMHASH;

// 		var isVerifySignature = paytmChecksum.verifySignature(
// 			fields,
// 			process.env.MERCHANT_KEY,
// 			paytmChecksum
// 		);
// 		if (isVerifySignature) {

// 			/**
// 			 * import checksum generation utility
// 			 * You can get this utility from https://developer.paytm.com/docs/checksum/
// 			 */
// 			const PaytmChecksum = require("./PaytmChecksum");

// 			/* initialize an object */
// 			var paytmParams = {};

// 			/* body parameters */
// 			paytmParams.body = {
// 				/* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
// 				mid: fields.MID,

// 				/* Enter your order id which needs to be check status for */
// 				orderId: fields.ORDERID,
// 			};

// 			/**
// 			 * Generate checksum by parameters we have in body
// 			 * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
// 			 */
// 			PaytmChecksum.generateSignature(
// 				JSON.stringify(paytmParams.body),
// 				process.env.MERCHANT_KEY
// 			).then(function (checksum) {
// 				/* head parameters */
// 				paytmParams.head = {
// 					/* put generated checksum value here */
// 					signature: checksum,
// 				};

// 				/* prepare JSON string for request */
// 				var post_data = JSON.stringify(paytmParams);

// 				var options = {
// 					/* for Staging */
// 					hostname: "securegw-stage.paytm.in",

// 					/* for Production */
// 					// hostname: 'securegw.paytm.in',

// 					port: 443,
// 					path: "/v3/order/status",
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 						"Content-Length": post_data.length,
// 					},
// 				};

// 				// Set up the request
// 				var response = "";
// 				var post_req = https.request(options, function (post_res) {
// 					post_res.on("data", function (chunk) {
// 						response += chunk;
// 					});

// 					post_res.on("end", function () {
// 						res.json(JSON.parse(response));
// 					});
// 				});

// 				// post the data
// 				post_req.write(post_data);
// 				post_req.end();
// 			});
// 		} else {
// 			console.log("Checksum Mismatched");
// 		}
// 	});
// });

const paytm_config = {
	MID: "YOUR_MID",
	WEBSITE: "WEBSTAGING",
	CHANNEL_ID: "WEB",
	INDUSTRY_TYPE_ID: "Retail",
	MERCHANT_KEY: "YOUR_MERCHANT_KEY",
};

route.post("/paytm-payment", (req, res) => {
	const { amount, email, phone } = req.body;
	if (!amount || !email || !phone) {
		return res.status(400).send({ message: "Missing required fields" });
	}

	// validate amount
	if (isNaN(amount) || amount <= 0) {
		return res.status(400).send({ message: "Invalid amount" });
	}

	// validate email
	if (!validateEmail(email)) {
		return res.status(400).send({ message: "Invalid email" });
	}

	// validate phone
	if (!validatePhone(phone)) {
		return res.status(400).send({ message: "Invalid phone" });
	}

	let params = {
		MID: paytm_config.MID,
		WEBSITE: paytm_config.WEBSITE,
		CHANNEL_ID: paytm_config.CHANNEL_ID,
		INDUSTRY_TYPE_ID: paytm_config.INDUSTRY_TYPE_ID,
		ORDER_ID: "ORDER" + Date.now(),
		CUST_ID: "CUST" + Date.now(),
		TXN_AMOUNT: amount,
		CALLBACK_URL: "http://localhost:3000/paytm-callback",
		EMAIL: email,
		MOBILE_NO: phone,
	};

	// Generate checksum
	paytm.checksum.genchecksum(
		params,
		paytm_config.MERCHANT_KEY,
		function (err, checksum) {
			if (err) {
				return res
					.status(500)
					.send({ message: "Failed to generate checksum" });
			}
			let paytmParams = { ...params, ...checksum };
			// Redirect user to Paytm gateway
			res.render("paytm-payment", { paytm: paytmParams });
		}
	);
});

route.post("/paytm-callback", (req, res) => {
	// Verify checksum
	paytm.checksum.verifychecksum(
		req.body,
		paytm_config.MERCHANT_KEY,
		function (err, isValid) {
			if (err) {
				return res
					.status(500)
					.send({ message: "Failed to verify checksum" });
			}
			if (!isValid) {
				return res.status(400).send({ message: "Invalid checksum" });
			}

			const {
				ORDERID,
				TXNAMOUNT,
				STATUS,
				TXNID,
				BANKTXNID,
				RESPCODE,
				RESPMSG,
				TXNDATE,
			} = req.body;

			// Handle transaction status
			if (STATUS === "TXN_SUCCESS") {
				// Update order status in database
				updateOrderStatus(
					ORDERID,
					"SUCCESS",
					TXNID,
					BANKTXNID,
					TXNDATE
				);
				return res
					.status(200)
					.send({ message: "Transaction successful" });
			} else {
				// Update order status in database
				updateOrderStatus(ORDERID, "FAILED", TXNID, BANKTXNID, TXNDATE);
				return res.status(200).send({
					message: `Transaction failed. Reason: ${RESPMSG}`,
				});
			}
		}
	);
});

// Email validation function
function validateEmail(email) {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

// Phone validation function
function validatePhone(phone) {
	const re = /^[0-9]{10}$/;
	return re.test(String(phone));
}

// Update order status function (placeholder, you should implement this function according to your application needs)
function updateOrderStatus(orderId, status, txnId, bankTxnId, txnDate) {
	console.log(`Updating order ${orderId} status to ${status}`);
	console.log(`Transaction ID: ${txnId}`);
	console.log(`Bank Transaction ID: ${bankTxnId}`);
	console.log(`Transaction Date: ${txnDate}`);
}

module.exports = route;
