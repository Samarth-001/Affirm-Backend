require('./instrument.js'); // Import Sentry initialization at the top

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const Sentry = require('@sentry/node');
const logger = require('./logger'); // Import Winston logger

const app = express();

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const AFFIRM_API_URL = 'https://sandbox.affirm.com/api/v1/transactions';
const AFFIRM_API_KEY = 'okkcASCfDWDbmnC4vOGR4VEbTAyHcWPh';

// Endpoint to handle the confirmation callback from Affirm
app.post('/confirm', async (req, res) => {
    const checkoutToken = req.body.checkout_token;
    const orderId = "JKLMO4321"; 

    if (!checkoutToken) {
        logger.error('Missing checkout_token');
        return res.status(400).send('Missing checkout_token');
    }
    logger.info(`Received checkout_token: ${checkoutToken}`);

    try {
        // Authorize the transaction
        const response = await axios.post(AFFIRM_API_URL, {
            transaction_id: checkoutToken,
            order_id: orderId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AFFIRM_API_KEY}`
            }
        });

        const transactionId = response.data.id;
        logger.info(`Transaction authorized with ID: ${transactionId}`);

        // Respond with success message
        res.status(200).send(`Transaction authorized with ID: ${transactionId}`);
    } catch (error) {
        logger.error('Error authorizing transaction:', error.response ? error.response.data : error.message);
        Sentry.captureException(error);
        res.status(500).send('Error authorizing transaction');
    }
});

// Endpoint to handle the cancellation callback from Affirm
app.post('/cancel', (req, res) => {
    logger.info('Payment canceled');
    res.status(200).send('Payment canceled');
});

// Sentry test route
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("This is a third test error! ");
});

Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    logger.error('Unhandled error:', err);
    Sentry.captureException(err);
    res.statusCode = 500;
    res.end("Sentry response: " + res.sentry + "\n");
});

const PORT = process.env.PORT || 6968;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
