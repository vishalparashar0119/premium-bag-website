import express from 'express';
import { upload } from '../config/cloudnaryMulterConfig.js';
import { createProduct, fetchAllProducts } from '../controllers/shopController.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/',isAdmin , fetchAllProducts);

router.get('/isAdmin',isAdmin ,  async ( req , res)=>{
      return res.status(200).json({success : true , message : 'this is admin'})
} );

router.post('/createProduct',isAdmin , upload.single('image'), createProduct )

export default router;