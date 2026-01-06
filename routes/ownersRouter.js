import express from 'express';
import { upload } from '../config/cloudnaryMulterConfig.js';
import { createProduct, deleteProduct, fetchAllProducts, fetchSingleProduct, getTodaysOrder, updateProcess } from '../controllers/shopController.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/', isAdmin, fetchAllProducts);

router.get('/isAdmin', isAdmin, async (req, res) => {
      return res.status(200).json({ success: true, message: 'this is admin' })
});


router.get('/product/:id', isAdmin, fetchSingleProduct);

router.post('/createProduct', isAdmin, upload.single('image'), createProduct);

router.delete('/deleteProduct/:id', isAdmin, deleteProduct);

router.get('/todaysOrder', isAdmin, getTodaysOrder);

router.put('/updateProcess/:id', isAdmin, updateProcess);

export default router;