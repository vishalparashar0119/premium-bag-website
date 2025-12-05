import express from 'express';
import { upload } from '../config/cloudnaryMulterConfig.js';
import { createProduct } from '../controllers/shopController.js';

const router = express.Router();

router.get('/', (req, res) => {
      res.send('Owners Home Page');
});

router.post('/createProduct', upload.single('image'), createProduct )

export default router;