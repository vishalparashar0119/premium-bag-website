import  express  from "express";
import isLoggendIn from "../middleware/isLoggedIn.js";

const router = express.Router();

router.get('/' , isLoggendIn , ( req , res) => {
      return res.status(200).json({ success : true , message : 'login successfully' , user : req.user})
})


export default router