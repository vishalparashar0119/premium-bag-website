// product model schema ::
// product name - string 
// price - number 
// image - string
// discount 
// background color 
// panel color 
// text color 

// updated fields 
// quantity - number to ensue product is in stock or out stock
//description 
// status - string - enum : ["in stock" , 'out of stock '];
//


import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
      productName: String,
      price: Number,
      image: {
           imageUrl : String ,
           publicId : String
      },
      discount: {
            type: Number,
            default: 0
      },
      description : String ,
      quantity : Number,
      backgroundColor: String,
      pannelColor: String,
      textColor: String
});

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;