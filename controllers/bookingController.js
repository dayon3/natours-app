const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
// const factory = require('./handlerFactory');
// const AppError = require('../utils/appError');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the curently booked tour
  const tour = await Tour.findById(req.params.tourID);

  // 2) Create checkout session
  const session = await Stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        // TODO: change this
        images: [`http://localhost:3000/public/img/tours/tour-1-cover.jpg`],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});
