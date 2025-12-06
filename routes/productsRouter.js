import express from 'express';
import isLoggedIn from '../middleware/isLoggedIn.js'
import { fetchSingleProduct } from '../controllers/shopController.js';

const router = express.Router();

router.get('/', (req, res) => {
      res.send('products Home Page');
});

router.get('/product/:id'  , isLoggedIn , fetchSingleProduct);

export default router;