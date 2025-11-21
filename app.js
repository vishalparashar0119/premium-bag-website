import express from 'express';
import cookieParser from 'cookie-parser';
import connectDb from './database/dataBase.js';
import ownersRouter from './routes/ownersRouter.js';
import usersRouter from './routes/usersRouter.js';
import productsRouter from './routes/productsRouter.js';    


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));


connectDb();

app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.get('/', (req, res) => {
      res.send('server is running');
});

app.listen(port, () => {
      console.log(`server is running on port http://localhost:${port}`);
})