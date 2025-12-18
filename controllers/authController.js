import genrateJwtToken from '../utils/genrateJwtToken.js';
import UserModel from '../models/UserModel.js';
import genrateHash from '../utils/genrateHash.js';
import comparePassword from '../utils/comparePassword.js';
import VerifyEmailModel from "../models/verifyEmailModel.js";
import otp from '../utils/genrateOtp.js';
import sendEmail from '../utils/sendEmail.js';





export const verifyEmail = async (req, res) => {

      try {
            const { fullName, email, password } = req.body;

            const user = await UserModel.findOne({ email });
            if (user) return res.status(409).json({ success: false, message: 'user already exist with this email' });

            const pendingVerification = await VerifyEmailModel.findOne({ email });
            if (pendingVerification) return res.status(409).json({ success: false, message: 'Email verification is pending. Please wait.' });

            const hashPassword = await genrateHash(password);
            const genOtp = otp();
            const sendMail = await sendEmail(email , genOtp);
            const hashOtp = await genrateHash(genOtp);


            const verifyUser = await VerifyEmailModel.create({ fullName, email, password: hashPassword, otp: hashOtp });

            const token = genrateJwtToken(verifyUser);

            res.cookie('verify', token , {
                  httpOnly: true,
                  secure: false,
                  sameSite: 'lax',
                  path: '/'
            })

            return res.status(200).json({ success: true, message: 'user verification created successfully', verifyUser });
      } catch (error) {
            console.log('Auth controller : Verify Email::',error.message);
            return res.status(500).json({success : false , message : 'Somthing went wrong!'});
      }
}

export const registerUser = async (req, res) => {
      try {
            const {otp} = req.body;
            const {email} = req.user;

             
            const pendingUser = await VerifyEmailModel.findOne({ email: email });

            const verified = await comparePassword(otp , pendingUser.otp);

            if(!verified) return res.status(401).json({success : false , message : 'Please enter a correct OTP'})

            const newUser = await UserModel.create({
                  fullName : pendingUser.fullName, email : pendingUser.email, password: pendingUser.password
            });

            const token = genrateJwtToken(newUser);

            res.cookie('token', token, {
                  httpOnly: true,
                  secure: false,
                  sameSite: 'lax',
                  path: '/'
            });

            res.status(200).json({
                  success: true,
                  user: newUser,
            });

      } catch (error) {
            console.log('Auth controller : Rejister Email::',error.message);
            return res.status(500).json({success : false , message : 'Somthing went wrong!'});
      }

}

export const loginUser = async (req, res) => {

      try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email: email });
            if (!user) return res.status(404).send({ success: false, message: 'email or password is incorrect' });

            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) return res.status(401).json({ success: false, message: 'email or password is incorrect' })

            const token = genrateJwtToken(user);
            res.cookie('token', token, {
                  httpOnly: true,
                  secure: false,
                  sameSite: 'lax',
                  path: '/'
            });

            return res.status(200).json({ success: true, message: 'login success fully' });

      } catch (error) {
            console.log('Auth controller : Login User::',error.message);
            return res.status(500).json({success : false , message : 'Somthing went wrong!'});
      }
}

export const logoutUser = async (req, res) => {
      try {

            res.clearCookie('token', {
                  httpOnly: true,
                  secure: false,
                  sameSite: 'lax',
                  path: '/'
            })

            res.status(200).json({ success: true, message: 'logout successfully' })
      } catch (error) {
            console.log('Auth controller : Logout User::',error.message);
            return res.status(500).json({success : false , message : 'Somthing went wrong!'});
      }
}