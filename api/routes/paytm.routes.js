const route = require("express").Router();
const { ensureAdmin } = require("../middlewares/Auth.js");
const PaytmChecksum = require("./PaytmChecksum");
const uuid = require("uuid").v4;
const formidable = require("formidable");
const https = require("https");

const paytm_config = {
	MID: "PtoitZ07358175676917",
	WEBSITE: "WEBSTAGING",
	CHANNEL_ID: "WEB",
	INDUSTRY_TYPE_ID: "Retail",
	MERCHANT_KEY: "7bF7Q9TJpJ43RJeD",
};

route.post("/paytm-payment", (req, res) => {
	const { amount, email, phone } = req.body;

	var paytmParams = {};

	/* initialize an array */
	paytmParams["MID"] = paytm_config.MID;
	paytmParams["ORDER_ID"] = uuid();
	paytmParams["CUST_ID"] = "CUST_001";
	paytmParams["INDUSTRY_TYPE_ID"] = paytm_config.INDUSTRY_TYPE_ID;
	paytmParams["CHANNEL_ID"] = paytm_config.CHANNEL_ID;
	paytmParams["TXN_AMOUNT"] = amount;
	paytmParams["WEBSITE"] = paytm_config.WEBSITE;
	paytmParams["CALLBACK_URL"] = "https://febval-upem.onrender.com/api/paytm/callback";
	paytmParams["EMAIL"] = email;
	paytmParams["MOBILE_NO"] = phone;

	/**
	 * Generate checksum by parameters we have
	 * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
	 */
	var paytmChecksum = PaytmChecksum.generateSignature(
		paytmParams,
		paytm_config.MERCHANT_KEY
	);
	paytmChecksum
		.then(function (checksum) {
			let PaytmParams = {
				...paytmParams,
				CHECKSUMHASH: checksum,
			};
			res.json(PaytmParams);
		})
		.catch(function (error) {
			console.log(error);
		});
});

route.post("/callback", (req, res) => {
	const form = new formidable.IncomingForm();

	form.parse(req, (err, fields, files) => {
		let paytmChecksum = fields.CHECKSUMHASH;
		delete fields.CHECKSUMHASH;

		let isVerifySignature = PaytmChecksum.verifySignature(
			fields,
			paytm_config.MERCHANT_KEY,
			paytmChecksum
		);
		if (isVerifySignature) {
			/* initialize an object */
			var paytmParams = {};

			/* body parameters */
			paytmParams.body = {
				/* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
				mid: fields.MID,

				/* Enter your order id which needs to be check status for */
				orderId: fields.ORDER_ID,
			};

			/**
			 * Generate checksum by parameters we have in body
			 * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
			 */
			PaytmChecksum.generateSignature(
				JSON.stringify(paytmParams.body),
				paytm_config.MERCHANT_KEY
			).then(function (checksum) {
				/* head parameters */
				paytmParams.head = {
					/* put generated checksum value here */
					signature: checksum,
				};

				/* prepare JSON string for request */
				var post_data = JSON.stringify(paytmParams);

				var options = {
					/* for Staging */
					// hostname: "securegw-stage.paytm.in",

					/* for Production */
					hostname: 'securegw.paytm.in',

					port: 443,
					path: "/v3/order/status",
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Content-Length": post_data.length,
					},
				};

				// Set up the request
				var response = "";
				var post_req = https.request(options, function (post_res) {
					post_res.on("data", function (chunk) {
						response += chunk;
					});

					post_res.on("end", function () {
						res.json(response);
					});
				});

				// post the data
				post_req.write(post_data);
				post_req.end();
			});
		} else {
			console.log("Checksum Mismatched");
		}
	});
});


module.exports = route;
