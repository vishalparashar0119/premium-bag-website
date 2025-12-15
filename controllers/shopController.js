import OrderModel from "../models/orderModel.js";
import ProductModel from "../models/ProductModel.js";
import UserModel from '../models/UserModel.js';


export const fetchAllProducts = async (req, res) => {

      try {
            const products = await ProductModel.find();
            return res.status(200).json({ success: true, products });
      } catch (error) {

            console.log('Shop controller : Fetch All Product ::', error.message);
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

            console.log('Shop controller : Create Product ::', error.message);
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

            console.log('Shop controller : Fetch Single Product ::', error.message);
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
            console.log('Shop controller : Get Product To Order ::', error.message);
            return res.status(500).json({ success: false, message: 'Somthing went worng' });
      }
}

export const orderProduct = async (req, res) => {
      try {
            const { amount, paymentId, productId, shippingAddress, quantity, modeOfPayment } = req.body;
            const { email , id } = req.user;

            const product = await ProductModel.findOneAndUpdate({ _id: productId, quantity: { $gte: 1 } },{$inc : {quantity : -1 , totalSell :+1}}, {new : true});

            if (!product) return res.status(409).json({ success: false, message: "Out of stock better luck next time"});

            const newOrder = await OrderModel.create({ amount, userId: id, paymentId, productId, shippingAddress, quantity, modeOfPayment });
            const user = await UserModel.findOneAndUpdate({ _id: id }, { $push: { orderHistory: newOrder._id } });


            return res.status(200).json({ success: true, message: 'Order successfull' })
      } catch (error) {
            console.log('Shop controller : OrderProduct ::', error.message);
            return res.status(500).json({ success: false, message: 'Somthing went worng?' })
      }
}

export const newestProducts = async (req, res) => {
      try {
            const products = await ProductModel.find().sort({ createdAt: -1 });
            return res.status(200).json({ success: true, message: "newest product", products });
      } catch (error) {
            console.log('Shop Controller : Newest Product ::', error.message);
            return res.status(500).json({ success: false, message: 'somthing went wrong' });
      }
}

export const popularProducs = async (req, res) => {
      try {
            const products = await ProductModel.find().sort({ totalSell: -1 });
            return res.status(200).json({ success: true, message: 'popular products', products });
      } catch (error) {
            console.log('Shop Controller : Popular Product ::', error.message);
            return res.status(500).json({ success: false, message: 'somthing went wrong' });
      }
}

export const discountProducts = async (req, res) => {
      try {
            const products = await ProductModel.find({ discount: { $gt: 0 } }).sort({ discount: -1, createdAt: -1 });
            if (products.length == 0) return res.status(200).json({ success: true, message: 'NO product yet' });
            return res.status(200).json({ success: true, message: 'popular products', products });
      } catch (error) {
            console.log('Shop Controller : Discount Product ::', error.message);
            return res.status(500).json({ success: false, message: 'somthing went wrong' });
      }
}

export const availableProducts = async (req, res) => {
      try {
            const products = await ProductModel.find({ quantity: { $gt: 0 } });
            return res.status(200).json({ success: true, message: 'popular products', products });
      } catch (error) {
            console.log('Shop Controller : Newest Product ::', error.message);
            return res.status(500).json({ success: false, message: 'somthing went wrong' });
      }
}
