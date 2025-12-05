import ProductModel from "../models/ProductModel.js"


export const fetchAllProducts = async (req, res) => {

      try {
            const products = await ProductModel.find();
            return res.status(200).json({success : true , products});
      }catch (error) {
            return res.status(500).json( { success : false , message : "internal server error"})
      }
      
}

export const createProduct = async (req, res) => {

      try {
            const { productName, price, discount, backgroundColor, pannelColor, textColor } = req.body;

            const imageUrl = req.file.path;
            const publicId = req.file.filename;
            
            const newProduct = await ProductModel.create({productName , price , image : {
                  imageUrl : imageUrl , publicId : publicId
            }, discount , backgroundColor , pannelColor , textColor})

            return res.status(200).json({
                  success: true,
                  message : 'Product created successfully'
            })
      } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
      }
}