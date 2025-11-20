import express from 'express';
import cookieParser from 'cookie-parser';


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use( cookieParser());
app.set('view engine' , 'ejs');
app.use(express.static('public'));

app.get('/' , (req ,res)=>{
      res.send('server is running');
});

app.listen(port , ()=>{
      console.log(`server is running on port http://localhost:${port}`);
})