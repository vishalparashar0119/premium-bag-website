// product model schema ::
// product name - string 
// price - number 
// image - string
// discount 
// background color 
// panel color 
// text color 


import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
      productName: String,
      price: Number,
      image: String,
      discount: {
            type: Number,
            default: 0
      },
      backgroundColor: String,
      pannelColor: String,
      textColor: String
});

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;