import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

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


            bcrypt.genSalt(11, (err, salt) => {

                  if (err) return res.send(err.message);

                  bcrypt.hash(password, salt, async (err, hash) => {
                        if (err) return res.send(err.message);
                        const newUser = await UserModel.create({
                              fullName, email, password: hash
                        })
                        res.send(newUser);
                  })
            })

      } catch (error) {
            console.log(error.message);
      }

});


export default router;