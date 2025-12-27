import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import connectDb from './database/dataBase.js';
import ownersRouter from './routes/ownersRouter.js';
import usersRouter from './routes/usersRouter.js';
import productsRouter from './routes/productsRouter.js';
import index from './routes/index.js';
import cors from 'cors';


const app = express();
app.use(cors({
      origin: ["http://localhost:5173", `https://premium-bag-website-front-git-afb1cd-vishal-parashar-s-projects.vercel.app`],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));


const port = process.env.PORT || 3000;
await connectDb();

app.use('/owners', ownersRouter);
app.use('/shop', index);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.get('/', (req, res) => {
      res.json({ message: 'server is running' });
});

app.listen(port, () => {
      console.log(`server is running on port http://localhost:${port}`);
})