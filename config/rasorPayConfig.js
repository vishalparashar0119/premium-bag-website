import 'dotenv/config';
import Razorpay from "razorpay";

const razorpay = new Razorpay({
      key_id:process.env.RAZORPAY_API_KEY,
      key_secret:process.env.RAZORPAY_API_SECRET
});


export default razorpay;



// Payment Success: {razorpay_payment_id: 'pay_RpvsT6ikVix5fp', razorpay_order_id: 'order_RpvrOwA5JdwaNB', razorpay_signature: '07f6a890c9b5ac1c60abbaa4154c2d6af2d041da77e1d044c5fdae83ca871728'}razorpay_order_id: "order_RpvrOwA5JdwaNB"razorpay_payment_id: "pay_RpvsT6ikVix5fp"razorpay_signature: "07f6a890c9b5ac1c60abbaa4154c2d6af2d041da77e1d044c5fdae83ca871728"[[Prototype]]: Object