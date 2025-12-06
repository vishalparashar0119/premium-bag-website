import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import isLoggendIn from '../middleware/isLoggedIn.js';
import { addToCart, fetchDataFromCart, myAccount, removeToCart } from '../controllers/userController.js';

const router = express.Router();


router.get('/', (req, res) => {
      res.send('Users Home Page');
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/myAccount', isLoggendIn , myAccount );

router.get('/cart' , isLoggendIn ,  fetchDataFromCart);

router.post('/addToCart/:id' , isLoggendIn ,  addToCart);

router.post('/removeToCart/:id' , isLoggendIn ,  removeToCart);


export default router;