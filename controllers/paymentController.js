import razorpay from '../config/rasorPayConfig.js';
import confirmSignature from '../utils/confirmSignature.js'

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
            console.log('Paymetn controller : Create Order Razorpay::',error.message);
            return res.status(500).json({success : false , message : 'Somthing went wrong!'});
      }
}

export const verifyRazorpayPayment = async (req, res) => {

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.paymentDetails;

      try {
            if (confirmSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
                  return res.status(200).json({ success: true, message: 'Payment verified! ' , razorpay_payment_id});
            } else {
                  return res.status(400).json({ success: false, message: 'Payment varification failed!' });
            }
      } catch (error) {
            console.log('Payment controller : Verify Payment::',error.message);
            return res.status(500).json({success : false , message : 'Somthing went wrong!'});
      }
}