import OrderModel from "../models/orderModel.js";
import ProductModel from "../models/ProductModel.js";
import UserModel from '../models/UserModel.js';


export const fetchAllProducts = async (req, res) => {

      try {
            const products = await ProductModel.find();
            return res.status(200).json({ success: true, products });
      } catch (error) {
            return res.status(500).json({ success: false, message: "internal server error" })
      }

}

export const createProduct = async (req, res) => {

      try {
            const { productName, price, discount, backgroundColor, pannelColor, textColor, description, quantity, status } = req.body;

            const imageUrl = req.file.path;
            const publicId = req.file.filename;

            const newProduct = await ProductModel.create({
                  productName, price, image: {
                        imageUrl: imageUrl, publicId: publicId
                  }, discount, backgroundColor, pannelColor, textColor, description, quantity, status
            })

            return res.status(200).json({
                  success: true,
                  message: 'Product created successfully'
            })
      } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
      }
}


export const fetchSingleProduct = async (req, res) => {
      try {
            const { id } = req.params;
            const product = await ProductModel.findById(id);
            if (!product) return res.status(404).json({ success: false, message: 'Product not found' })

            return res.status(200).json({
                  success: true,
                  message: 'product found',
                  product
            })
      } catch (error) {
            console.log(error.message)
      }
}

export const getProductToOrder = async (req, res) => {
      try {
            const { email } = req.user;
            const { id } = req.params;

            const user = await UserModel.findOne({ email }).populate('cart.products');
            const product = await ProductModel.findById(id);

            return res.status(200).json({ success: true, message: "data found", product, user });


      } catch (error) {
            console.log('Shop controller : order Product ::', error.message);
            return res.status(500).json({ success: false, message: 'Somthing went worng' });
      }
}

export const orderProduct = async (req, res) => {
      try {
            const { amount, userId, paymentId, productId, shippingAddress, quantity, modeOfPayment } = req.body;
            const { email } = req.user;

            const product = await ProductModel.findById(productId);

            if (product.quantity == 0) return res.status(409).json({ success: false, message: "Out of stock better luck next time" });

            const user = await UserModel.findOne({ email });
            const newOrder = await OrderModel.create({ amount, userId, paymentId, productId, shippingAddress, quantity, modeOfPayment });

            product.quantity -= 1;
            await product.save();

            user.orderHistory.push(newOrder._id);
            await user.save();

            return res.status(200).json({ success: true, message: 'Order successfull' })
      } catch (error) {
            console.log('Shop controller : orderProduct ::', error.message);
            return res.status(500).json({ success: false, message: 'Somthing went worng?' })
      }
}