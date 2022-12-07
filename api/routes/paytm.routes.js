const route = require("express").Router();
const { ensureAdmin } = require("../middlewares/Auth.js");
const PaytmChecksum = require("../PaytmChecksum");
const uuid = require("uuid").v4;
const formidable = require("formidable");

route.post("/payment", (req, res) => {
	const { cartProducts } = req.body;
	if (!cartProducts)
		return res.status(400).json({ message: "No products in cart" });

	const paytmParams = {};
	paytmParams["MID"] = process.env.MID;
	paytmParams["WEBSITE"] = process.env.WEBSITE;
	paytmParams["CHANNEL_ID"] = process.env.CHANNEL_ID;
	paytmParams["INDUSTRY_TYPE_ID"] = process.env.INDUSTRY_TYPE_ID;
	paytmParams["ORDER_ID"] = uuid();
	paytmParams["CUST_ID"] = process.env.CUST_ID;
	paytmParams["TXN_AMOUNT"] = "1.00";
	paytmParams["CALLBACK_URL"] = process.env.CALLBACK_URL;
	paytmParams["EMAIL"] = "mamam@mam";
	paytmParams["MOBILE_NO"] = "9000";

	/**
	 * Generate checksum by parameters we have
	 * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
	 */
	var paytmChecksum = PaytmChecksum.generateSignature(
		paytmParams,
		process.env.MERCHANT_KEY
	);
	paytmChecksum
		.then(function (checksum) {
			console.log("generateSignature Returns: " + checksum);
			paytmParams["CHECKSUMHASH"] = checksum;
			res.json(paytmParams);
		})
		.catch(function (error) {
			console.log(error);
		});
});

module.exports = route;
