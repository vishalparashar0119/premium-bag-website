import express from 'express';
import { upload } from '../config/cloudnaryMulterConfig.js';
import { createProduct, fetchAllProducts } from '../controllers/shopController.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/',isAdmin , fetchAllProducts);

router.post('/createProduct',isAdmin , upload.single('image'), createProduct )

export default router;