import jwt from "jsonwebtoken";
import OwnerModel from '../models/ownerModel.js'


const isAdmin = async (req, res, next) => {
      if (!req.cookies.token) return res.status(404).json({ success: false, message: 'Unautherised access' });

      try {
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            const admin = await OwnerModel.findOne({ email: decoded.email }).select('-password');
      

            if (!admin) return res.status(404).json({ success: false, message: 'Unautherised access' });

            res.user = { email: admin.email, id: admin._id };
            next();
      } catch (error) {
            console.log('Middleware : Is Admin ::',error.message);
            return res.status(500).json({success : false , message : 'Internal server error!'})
      }
}

export default isAdmin;