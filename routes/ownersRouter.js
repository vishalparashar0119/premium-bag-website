import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
      res.send('Owners Home Page');
});

router.post('/createProduct', async (req, res) => {

      try {
            const { productName, price, image, discount, backgroundColor, pannelColor, textColor } = req.body;

            return res.status(200).json({
                  success: true,
                  user: req.body
            })
      } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
      }
      res.send('create proudct')
})

export default router;