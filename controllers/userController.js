import razorpay from "../config/rasorPayConfig.js";
import UserModel from "../models/UserModel.js";
import crypto from 'crypto'
import confirmSignature from "../utils/confirmSignature.js";

export const myAccount = async (req, res) => {

      try {
            const user = await UserModel.findOne({ email: req.user.email }).populate('orderHistory').select('-password')
            return res.status(200).json({ success: true, user: user });
      } catch (error) {
            return res.status(500).json({ success: false, message: 'internal server error' })
      }

}


export const addToCart = async (req, res) => {
      try {
            const { email } = req.user;
            const { id } = req.params;
            const user = await UserModel.findOne({ email: email });


            const inTheCart = user.cart.some((items) => { return items.products.toString() == id });


            if (inTheCart) return res.status(409).json({ success: false, message: 'Already have in cart' });

            user.cart.push({
                  products: id
            });
            await user.save()
            return res.status(200).json({ success: true, message: 'Add to cart successfully' });

      } catch (error) {
            console.log('add to cart api::', error.message);
            return res.status(400).json({ success: false, message: ' somting went wrong' })
      }
}

export const fetchDataFromCart = async (req, res) => {
      try {
            const { email } = req.user;
            const cartData = await UserModel.findOne({ email }).populate('cart.products');

            return res.status(200).json({ success: true, cartData })
      } catch (error) {
            console.log('fetch data from cart api ::', error.message);
            return res.status(500).json({ success: false, message: 'somthing went wrong please try again' });
      }
}

export const removeToCart = async (req, res) => {
      try {
            const { id } = req.params;
            const { email } = req.user;

            const user = await UserModel.findOne({ email: email }).select('-password');

            const inTheCart = user.cart.some((items) => { return items.products.toString() == id })

            if (inTheCart) {
                  user.cart = user.cart.filter((items) => { return items.products.toString() !== id });
                  await user.save();

                  const updatedCart = await user.populate('cart.products');
                  return res.status(200).json({ success: true, message: 'Remove from cart successfully', cartData: updatedCart.cart });
            }


            return res.status(404).json({ success: false, message: 'product not found in cart' })


      } catch (error) {
            console.log(error.message)
      }
}

export const updateQuantity = async (req, res) => {
      try {
            const { id, action } = req.body;
            const { email } = req.user;

            const value = action == 'increase' ? 1 : -1;
            const user = await UserModel.findOneAndUpdate({ email: email, 'cart.products': id }, {
                  $inc: { 'cart.$.quantity': value }
            }, { new: true });

            const updatedCart = await user.populate('cart.products');
            return res.status(200).json({ success: true, message: 'updated quantity', updatedCart })
      } catch (error) {
            console.log(error.message)
      }
}

export const createOrderRazorPay = async (req, res) => {
      const { amount } = req.body;
      console.log(amount)
      try {
            const order = await razorpay.orders.create({
                  amount: amount * 100,
                  currency: "INR"
            });

            return res.status(200).json({ success: true, message: 'Order  created successfully ', order });
      } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, message: 'Somthing went wrong' })
      }
}

export const verifyRazorpayPayment = async (req, res) => {

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.paymentDetails;

      try {
            if (confirmSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
                  return res.status(200).json({ success: true, message: 'Payment verified! ' });
            } else {
                  return res.status(400).json({ success: false, message: 'Payment varification failed!' });
            }
      } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, message: 'Somthing went wrong' })
      }
}