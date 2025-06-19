import {Router} from "express";
import { signInUser } from "../controllers/auth-controller.js";


const router = Router();

//Login user
router.post("/login",signInUser );



export default router;
