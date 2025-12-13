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

const ownerSchema = new mongoose.Schema({
      fullName: String,
      email: String,
      password: String,
      phoneNo: Number,
      address: String,
      products: {
            type: Array,
            default: []
      },
      gstNumber : String
}, {
      timestamps: true
});

const OwnerModel = mongoose.model('Owner', ownerSchema);
export default OwnerModel;