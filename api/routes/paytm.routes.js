const route = require("express").Router();
const { ensureAdmin } = require("../middlewares/Auth.js");
const PaytmChecksum = require("./PaytmChecksum");
const uuid = require("uuid").v4;
const formidable = require("formidable");
const https = require("https");

const paytm_config = {
    MID: "uqaqor71832119145372",
    WEBSITE: "WEBSTAGING",
    CHANNEL_ID: "WEB",
    INDUSTRY_TYPE_ID: "Retail",
    MERCHANT_KEY: "7bF7Q9TJpJ43RJeD",
};

route.post("/paytm-payment", (req, res) => {
    let paytmParams = {};

    let orderID = uuid();
    let amount = "1.00";

    paytmParams.body = {
        requestType: "Payment",
        mid: paytm_config.MID,
        websiteName: paytm_config.WEBSITE,
        orderId: orderID,
        callbackUrl: "http://localhost:3001/api/paytm/callback",
        txnAmount: {
            value: amount,
            currency: "INR",
        },
        userInfo: {
            custId: "CUST_001",
        },
    };

    /*
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    PaytmChecksum.generateSignature(
        JSON.stringify(paytmParams.body),
        paytm_config.MERCHANT_KEY
    ).then(function (checksum) {
        paytmParams.head = {
            signature: checksum,
        };

        let post_data = JSON.stringify(paytmParams);

        let options = {
            /* for Staging */
            hostname: "securegw-stage.paytm.in" /* for Production */, // hostname: 'securegw.paytm.in',

            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${paytm_config.MID}&orderId=${orderID}`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": post_data.length,
            },
        };

        let response = "";
        let post_req = https.request(options, function (post_res) {
            post_res.on("data", function (chunk) {
                response += chunk;
            });

            post_res.on("end", function () {
                console.log("Response: ", response);

                let r = JSON.parse(response);
                r.orderID = orderID;
                r.amount = amount;
                r.mid = paytm_config.MID;
                res.send(r);
            });
        });

        post_req.write(post_data);
        post_req.end();
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
            let paytmParams = {};

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
                let post_data = JSON.stringify(paytmParams);

                let options = {
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
                let response = "";
                let post_req = https.request(options, function (post_res) {
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
