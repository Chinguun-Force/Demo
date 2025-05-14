import {Router} from "express"
import { forgotPassword, login, signUp } from "../controller/auth";
import { updatePassword } from "../controller/reset-password";
import { verifyToken } from "../middleware/verifytoken";
// import { resetRequest } from "../controller/reset-password";

const authRouter = Router();

authRouter
.post('/sign-up', signUp)
.post('/login', login)
.post('/forgot-password', forgotPassword)
.post("/update-password", verifyToken, updatePassword);
export { authRouter };