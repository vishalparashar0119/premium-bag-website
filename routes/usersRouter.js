import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();


router.get('/', (req, res) => {
      res.send('Users Home Page');
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

export default router;