import genrateJwtToken from '../utils/genrateJwtToken.js';
import UserModel from '../models/UserModel.js';
import genrateHash from '../utils/genrateHash.js';
import comparePassword from '../utils/comparePassword.js';



export const registerUser = async (req, res) => {
      try {
            const { fullName, email, password } = req.body;

            const user = await UserModel.findOne({ email: email });
            if (user) return res.status(400).send({ message: 'user already exists' });


            const hashPassword = await genrateHash(password);
            const newUser = await UserModel.create({
                  fullName, email, password: hashPassword
            });

            const token = genrateJwtToken(newUser);
            res.cookie('token', token);

            res.send(newUser);

      } catch (error) {
            console.log(error.message);
      }

}

export const loginUser = async (req, res) => {

      try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email: email });
            if (!user) return res.status(404).send({ message: 'email or password is incorrect' });

            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) return res.status(401).send({ message: 'email or password is incorrect' })

            const token = genrateJwtToken(user);
            res.cookie('token', token);

            return res.send({ message: "user login successfully" });

      } catch (error) {
            console.log(error.message);
      }
}