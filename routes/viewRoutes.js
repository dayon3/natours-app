const express = require('express');
const { isLoggedIn, protect } = require('../controllers/authController');
const {
  getOverview,
  getTour,
  getLoginForm,
  getSignupForm,
  getAccount,
  updateUserData,
} = require('../controllers/viewController');

const router = express.Router();

router.get('/', isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/me', protect, getAccount);
router.get('/signup', isLoggedIn, getSignupForm);

router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
