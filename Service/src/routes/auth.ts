import {Router} from "express"
import {  login, signUp } from "../controller/auth";
import { resetRequest, updatePassword } from "../controller/reset-password";
import { verifyToken } from "../middleware/verifytoken";
// import { resetRequest } from "../controller/reset-password";

const authRouter = Router();

authRouter
.post('/sign-up', signUp)
.post('/login', login)
.post('/forgot-password', resetRequest)
.post("/update-password", verifyToken, updatePassword);
export { authRouter };