import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
      amount: Number,
       productId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
      },
      productSnapShot: [{
            name : String,
            image : {
                  imageUrl : String,
                  publicId : String
            },
            priceWhenOrder:Number,
            
      }],
      userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
      },
      paymentId: {
            type: String,
            require: () => {
                  return this.modeOfPayment === 'Online'
            }
      },
      shippingAddress: String,
      status: {
            type: String,
            enum: ['Ordered', 'Delevered', 'Returned'],
            default: 'Ordered'
      },
      quantity: {
            type: Number,
            default: 1
      },
      modeOfPayment: {
            type: String,
            enum: ['Online', 'COD']
      }
}, {
      timestamps: true
});

const OrderModel = mongoose.model('order', orderSchema);
export default OrderModel;