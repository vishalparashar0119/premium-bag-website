import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';


const isLoggendIn =  async (req , res , next) => {

      if(!req.cookies.token) {
            req.flash('error' , 'you neend to login first');
            return res.redirect('/');
      }

      try {
            const decoded = jwt.verify(req.cookies.token , process.env.JWT_SECRET);
            const user = await UserModel.findOne({email : decoded.email}).select('-password');
            req.user = user;
      }catch(error) {
            req.flash('error' , 'something went wrong , please login again');
            return res.redirect('/');
      }
}