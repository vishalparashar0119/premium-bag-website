// user model ::
// full name - string
// email - string
// password - string
// cart  - array of product mongoose ids
// isAdmin - boolean by default false
// phone no - number
// address - string
// order histor - array of order mongoose ids


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
      fullName: String,
      email: String,
      password: String,
      cart: [{
            products: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Product'
            },
            quantity: {
                  type: Number,
                  default: 1
            }

      }],
      isAdmin: {
            type: Boolean,
            default: false
      },
      phoneNo: Number,
      address: String,
      orderHistory: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'order'
            }
      ]
}, {
      timestamps: true
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;