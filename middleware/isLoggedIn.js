import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';


const isLoggendIn = async (req, res, next) => {

      if (!req.cookies.token) return res.status(401).json({ status: false, message: ' unautherise access' });

      try {
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            const user = await UserModel.findOne({ email: decoded.email }).select('-password');

            if(!user) return res.status(404).json({success : false , message : 'user not found'});

            req.user = {email : user.email , id : user._id};
            next();
      } catch (error) {
            console.log('Middleware : Is Loggend In ::',error.message)
            return res.status(404).json({ status: false, message: ' unautherise access' })
      }
}


export default isLoggendIn