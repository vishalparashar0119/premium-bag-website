import crypto from 'crypto';

const confirmSignature = (orderId, paymentId , razorPaySignature) => {

      const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET).update(orderId + "|" + paymentId).digest('hex');

      if (generatedSignature === razorPaySignature) {
            return true
      } else {
            return false
      }
}

export default confirmSignature;
