import VerifyEmailModel from "../models/verifyEmailModel.js";
import jwt from 'jsonwebtoken'

const isVerificationPending = async (req, res, next) => {

      if (!req.cookies.verify) return res.status(404).json({ success: false, message: 'otp expired' });

      try {
            const decoded = jwt.verify(req.cookies.verify, process.env.JWT_SECRET);
            const pendingVerification = await VerifyEmailModel.findOne({ email: decoded.email });

            if (!pendingVerification) return res.status(404).json({ success: false, message: 'Verification with this email not found' });

            req.user = { email: pendingVerification.email, id: pendingVerification._id };

            next();
      } catch (error) {
            console.log('Middleware : Is Verification Pending ::',error.message);
            return res.status(500).json({success : false , message : 'Somthing went worng!'})
      }
}

export default isVerificationPending;