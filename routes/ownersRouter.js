import express from 'express';
import upload from '../config/multerConfig.js';
import ProductModel from '../models/ProductModel.js';

const router = express.Router();

router.get('/', (req, res) => {
      res.send('Owners Home Page');
});

router.post('/createProduct', upload.single('image'), async (req, res) => {

      try {
            const { productName, price, discount, backgroundColor, pannelColor, textColor } = req.body;
            
            const newProduct = await ProductModel.create({productName , price , image : req.file.buffer, discount , backgroundColor , pannelColor , textColor})

            return res.status(200).json({
                  success: true,
                  user: newProduct,
            })
      } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
      }
      res.send('create proudct')
})

export default router;