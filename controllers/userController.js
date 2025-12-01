import UserModel from "../models/UserModel.js";

export const myAccount = async (req, res) => {

      try {
            const user = await UserModel.findOne({ email: req.user.email }).populate('orderHistory').select('-password')
            return res.status(200).json({ success: true, user: user });
      } catch (error) {
            return res.status(500).json({ success: false, message: 'internal server error' })
      }

}