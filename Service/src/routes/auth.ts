import {Router} from "express"
import {  login, signUp } from "../controller/auth";
import { resetRequest, updatePassword } from "../controller/reset-password";
import { verifyToken } from "../middleware/verifytoken";
import { getUserProfile } from "../controller/player";
import { checkToken } from "../middleware/checktoken";
// import { resetRequest } from "../controller/reset-password";

const authRouter = Router();

authRouter
.post('/sign-up', signUp)
.post('/login', login)
.post('/forgot-password', resetRequest)
.post("/update-password", verifyToken, updatePassword)
.get('/profile' ,checkToken, getUserProfile);

export { authRouter };