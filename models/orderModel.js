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
            ref: 'User'
      },
      paymentId: {
            type: String,
            require: function(){
                  return this.modeOfPayment === 'Online'
            }
      },
      shippingAddress: String,
      quantity: {
            type: Number,
            default: 1
      },
      modeOfPayment: {
            type: String,
            enum: ['Online', 'COD']
      },
      status:{
            type : String,
            enum :['Not Viewed' , 'Viewed','Packed','Shipped','Delivered','Returned'],
            default:'Not Viewed'
      },
      counter : {
            type :Number,
            default : 0,
      }
}, {
      timestamps: true
});

const OrderModel = mongoose.model('order', orderSchema);
export default OrderModel;