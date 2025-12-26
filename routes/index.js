import  express  from "express";
import isLoggendIn from "../middleware/isLoggedIn.js";
import { fetchAllProducts } from "../controllers/shopController.js";

const router = express.Router();

router.get('/' , isLoggendIn , fetchAllProducts)


export default router