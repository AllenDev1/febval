const route = require("express").Router();
const { ensureAdmin } = require("../middlewares/Auth.js");
const paytmChecksum = require("../PaytmChecksum");
const uuid = require("uuid").v4;
const formidable = require("formidable");

route.post("/payment", (req, res) => {
	const { amount, email, phone } = req.body;

	const paytmParams = {};
	paytmParams["MID"] = process.env.MID;
	paytmParams["WEBSITE"] = process.env.WEBSITE;
	paytmParams["CHANNEL_ID"] = process.env.CHANNEL_ID;
	paytmParams["INDUSTRY_TYPE_ID"] = process.env.INDUSTRY_TYPE_ID;
	paytmParams["ORDER_ID"] = uuid();
	paytmParams["CUST_ID"] = process.env.CUST_ID;
	paytmParams["TXN_AMOUNT"] = amount;
	paytmParams["CALLBACK_URL"] = process.env.CALLBACK_URL;
	paytmParams["EMAIL"] = email;
	paytmParams["MOBILE_NO"] = phone;

	/**
	 * Generate checksum by parameters we have
	 * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
	 */
	var paytmChecksum = paytmChecksum.generateSignature(
		paytmParams,
		process.env.MERCHANT_KEY
	);
	paytmChecksum
		.then(function (checksum) {
			console.log("generateSignature Returns: " + checksum);
			let paytmParams = {
				...paytmParams,
				CHECKSUMHASH: checksum,
			};
			res.json(paytmParams);
		})
		.catch(function (error) {
			console.log(error);
		});
});

route.post("/callback", (req, res) => {
	const form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		paytmChecksum = fields.CHECKSUMHASH;
		delete fields.CHECKSUMHASH;

		var isVerifySignature = paytmChecksum.verifySignature(
			fields,
			process.env.MERCHANT_KEY,
			paytmChecksum
		);
		if (isVerifySignature) {
		
			/**
			 * import checksum generation utility
			 * You can get this utility from https://developer.paytm.com/docs/checksum/
			 */
			const PaytmChecksum = require("./PaytmChecksum");

			/* initialize an object */
			var paytmParams = {};

			/* body parameters */
			paytmParams.body = {
				/* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
				mid: fields.MID,

				/* Enter your order id which needs to be check status for */
				orderId: fields.ORDERID,
			};

			/**
			 * Generate checksum by parameters we have in body
			 * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
			 */
			PaytmChecksum.generateSignature(
				JSON.stringify(paytmParams.body),
				process.env.MERCHANT_KEY
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
					hostname: "securegw-stage.paytm.in",

					/* for Production */
					// hostname: 'securegw.paytm.in',

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
						res.json(JSON.parse(response));
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
