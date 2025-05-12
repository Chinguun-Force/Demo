import {Router} from "express"
import { login, signUp } from "../controller/auth";
import { checkToken } from "../middleware/checktoken";

const authRouter = Router();

authRouter
.post('/sign-up', signUp)
.post('/login', login)

export { authRouter };