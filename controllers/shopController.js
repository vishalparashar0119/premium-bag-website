import ProductModel from "../models/ProductModel.js"


export const fetchAllProducts = async (req, res) => {

      try {
            const products = await ProductModel.find();
            return res.status(200).json({success : true , products});
      }catch (error) {
            return res.status(500).json( { success : false , message : "internal server error"})
      }
      
}