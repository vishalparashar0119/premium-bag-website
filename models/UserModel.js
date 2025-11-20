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

mongoose.connect(process.env.MONGODBURL, {
      serverSelectionTimeoutMS: 5000
})

const userSchema = new mongoose.Schema({
      fullName: String,
      email: String,
      password: String,
      cart: {
            type: Array,
            default: []
      },
      isAdmin: {
            type: Boolean,
            default: false
      },
      phoneNo: Number,
      address: String,
      orderHistory: {
            type: Array,
            default: []
      }
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;