import genrateJwtToken from '../utils/genrateJwtToken.js';
import UserModel from '../models/UserModel.js';
import genrateHash from '../utils/genrateHash.js';
import comparePassword from '../utils/comparePassword.js';



export const registerUser = async (req, res) => {
      try {
            const { fullName, email, password } = req.body;

            const user = await UserModel.findOne({ email: email });
            if (user) return res.status(400).json({ success: false, message: 'user already exist' });


            const hashPassword = await genrateHash(password);
            const newUser = await UserModel.create({
                  fullName, email, password: hashPassword
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
            console.log(error.message);
      }

}

export const loginUser = async (req, res) => {

      try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email: email });
            if (!user) return res.status(404).send({ success : false , message: 'email or password is incorrect' });

            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) return res.status(401).json({success : false , message : 'email or password is incorrect'})

            const token = genrateJwtToken(user);
            res.cookie('token', token ,{
                  httpOnly: true,
                  secure: false,
                  sameSite: 'lax',
                  path: '/'
            });

            return res.status(200).json({success : true , message : 'login success fully'});

      } catch (error) {
            console.log(error.message);
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
            res.status(500).json({ success: false, message: 'something went wrong' });
      }
}