import express from 'express';
import isLoggedIn from '../middleware/isLoggedIn.js'
import { availableProducts, discountProducts, fetchSingleProduct, newestProducts, orderProduct, popularProducs } from '../controllers/shopController.js';

const router = express.Router();

router.get('/', (req, res) => {
      res.send('products Home Page');
});

router.get('/product/:id'  , isLoggedIn , fetchSingleProduct);

router.post('/product/order'  , isLoggedIn , orderProduct);

router.get('/filter/newest' , newestProducts);

router.get('/filter/popular' , popularProducs);

router.get('/filter/discount' , discountProducts);

router.get('/filter/available' , availableProducts);

export default router;