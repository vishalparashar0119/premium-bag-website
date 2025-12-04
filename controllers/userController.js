import UserModel from "../models/UserModel.js";

export const myAccount = async (req, res) => {

      try {
            const user = await UserModel.findOne({ email: req.user.email }).populate('orderHistory').select('-password')
            return res.status(200).json({ success: true, user: user });
      } catch (error) {
            return res.status(500).json({ success: false, message: 'internal server error' })
      }

}


export const addToCart = async (req, res) => {
      try {
            const user = await UserModel.findOne({ email: req.user.email });
            user.cart.push(req.params.id)
            await user.save()

            return res.status(200).json({success : true , message : 'product created successfully'})
      } catch (error) {
            console.log(error.message);
            return res.status(400).json({ success : false , message : ' somting went wrong'})
      }
}

export const fetchDataFromCart = async (req ,res) => {
      try {
            const { email }  = req.user;
            const cartData = await UserModel.findOne({email}).select('cart').populate('cart');

            return res.status(200).json({success : true , cartData : cartData})
      } catch (error) {
            return res.status(500).json ( { success : false , message : 'internal server error'});
      }
}