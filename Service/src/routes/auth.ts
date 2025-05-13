import {Router} from "express"
import { forgotPassword, login, signUp } from "../controller/auth";
import { checkToken } from "../middleware/checktoken";

const authRouter = Router();

authRouter
.post('/sign-up', signUp)
.post('/login', login)
.post('/forgot-password', forgotPassword)

export { authRouter };