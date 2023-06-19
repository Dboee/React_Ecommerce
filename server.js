// Import necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const enforce = require('express-sslify');

// If not in production, load environment variables from .env file
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// Set up Stripe with your secret key from environment variables
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Initialize the express application
const app = express();
// Set the port, either from environment variables or default to 5000
const port = process.env.PORT || 5000;

// Use bodyParser to parse JSON payloads
app.use(bodyParser.json());
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Enforce HTTPS on all incoming requests
app.use(enforce.HTTPS({ trustProtoHeader: true }));

// Use cors to allow cross origin requests
app.use(cors());

// If in production, serve static files from the 'client/build' directory
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Serve the index.html file for any unknown routes
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Start the server and listen on the defined port
app.listen(port, (error) => {
  // If there is an error, throw it
  if (error) throw error;
  // Log that the server is running
  console.log('Server running on port ' + port);
});

// Serve the service worker file
app.get('./service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

// Route to handle payments
app.post('/payment', (req, res) => {
  // Create the charge object with necessary information
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd',
  };

  // Make a charge using stripe
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    // If there is a stripe error, send a 500 status
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      // If successful, send back the response from Stripe
      res.status(200).send({ success: stripeRes });
    }
  });
});
