import  express  from "express";
import { loginUser, registerUser } from "../Controllers/AuthController.js";

const router =express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
// router.post('/otpVerify',otpVerify)
// router.post('/registerok',registerUserok)

export default router