/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51I3J0kFBZSA9mj3I1dlXxWaA6p74CbJMHaHSuYKYToMukUzsZH5mhP0J3N2tpR69Puqff1NwAXJAKMG4bQxGNe8K00T7OuJSQa'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    //  2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
