import express from 'express';
import genrateJwtToken from '../utils/genrateJwtToken.js';
import UserModel from '../models/UserModel.js';
import genrateHash from '../utils/genrateHash.js';

const router = express.Router();


router.get('/', (req, res) => {
      res.send('Users Home Page');
});

router.post('/register', async (req, res) => {
      try {
            const { fullName, email, password } = req.body;
            const user = await UserModel.findOne({ email: email });

            if (user) {
                  return res.status(400).send({ message: 'user already exists' });
            }

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

});


export default router;