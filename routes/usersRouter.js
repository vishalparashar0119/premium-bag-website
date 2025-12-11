import express from 'express';
import { registerUser, loginUser, logoutUser, verifyEmail } from '../controllers/authController.js';
import isLoggendIn from '../middleware/isLoggedIn.js';
import { addToCart, fetchDataFromCart, myAccount, removeToCart, updateQuantity } from '../controllers/userController.js';
import isVerificationPending from '../middleware/isVerificationPending.js';
import { createOrderRazorPay, verifyRazorpayPayment } from '../controllers/paymentController.js';
import { getProductToOrder } from '../controllers/shopController.js';

const router = express.Router();


router.get('/', (req, res) => {
      res.send('Users Home Page');
});

router.post('/verify', verifyEmail);

router.post('/register', isVerificationPending, registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/myAccount', isLoggendIn, myAccount);

router.get('/cart', isLoggendIn, fetchDataFromCart);

router.post('/addToCart/:id', isLoggendIn, addToCart);

router.post('/removeToCart/:id', isLoggendIn, removeToCart);

router.put('/updateQuantity', isLoggendIn, updateQuantity);

router.post('/razorPay/createOrder', createOrderRazorPay);

router.post('/razorPay/verifyPayment', verifyRazorpayPayment);

router.get('/order/:id',isLoggendIn , getProductToOrder);

export default router;