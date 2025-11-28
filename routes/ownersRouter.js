import express from 'express';
import { upload } from '../config/cloudnaryMulterConfig.js';
import ProductModel from '../models/ProductModel.js';

const router = express.Router();

router.get('/', (req, res) => {
      res.send('Owners Home Page');
});

router.post('/createProduct', upload.single('image'), async (req, res) => {

      try {
            const { productName, price, discount, backgroundColor, pannelColor, textColor } = req.body;

            const imageUrl = req.file.path;
            const publicId = req.file.filename;
            
            const newProduct = await ProductModel.create({productName , price , image : {
                  imageUrl : imageUrl , publicId : publicId
            }, discount , backgroundColor , pannelColor , textColor})

            return res.status(200).json({
                  success: true,
                  user: newProduct,
                  fileName : req.file
            })
      } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
      }
})

export default router;