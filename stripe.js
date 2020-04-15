var Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET);

exports.stripe = stripe;
