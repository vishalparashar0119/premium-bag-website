import ProductModel from "../models/ProductModel.js";
import UserModel from '../models/UserModel.js';


export const fetchAllProducts = async (req, res) => {

      try {
            const products = await ProductModel.find();
            return res.status(200).json({ success: true, products });
      } catch (error) {
            return res.status(500).json({ success: false, message: "internal server error" })
      }

}

export const createProduct = async (req, res) => {

      try {
            const { productName, price, discount, backgroundColor, pannelColor, textColor } = req.body;

            const imageUrl = req.file.path;
            const publicId = req.file.filename;

            const newProduct = await ProductModel.create({
                  productName, price, image: {
                        imageUrl: imageUrl, publicId: publicId
                  }, discount, backgroundColor, pannelColor, textColor
            })

            return res.status(200).json({
                  success: true,
                  message: 'Product created successfully'
            })
      } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
      }
}


export const fetchSingleProduct = async (req, res) => {
      try {
            const { id } = req.params;
            const product = await ProductModel.findById(id);
            if (!product) return res.status(404).json({ success: false, message: 'Product not found' })

            return res.status(200).json({
                  success: true,
                  message: 'product found',
                  product
            })
      } catch (error) {
            console.log(error.message)
      }
}

export const getProductToOrder = async ( req , res) =>{
      try {
            const {email} = req.user;
            const {id} = req.params; 

            const user = await UserModel.findOne({email}).populate('cart.products');
            const product = await ProductModel.findById(id);

            return res.status(200).json({success : true , message:"data found" , product , user});


      } catch (error) {
       console.log('Shop controller : order Product ::',error.message);
       return res.status(500).json({success : false , message : 'Somthing went worng'});     
      }
}