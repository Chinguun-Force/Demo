"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const reset_password_1 = require("../controller/reset-password");
const verifytoken_1 = require("../middleware/verifytoken");
const player_1 = require("../controller/player");
const checktoken_1 = require("../middleware/checktoken");
// import { resetRequest } from "../controller/reset-password";
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter
    .post('/sign-up', auth_1.signUp)
    .post('/login', auth_1.login)
    .post('/forgot-password', reset_password_1.resetRequest)
    .post("/update-password", verifytoken_1.verifyToken, reset_password_1.updatePassword)
    .get('/profile', checktoken_1.checkToken, player_1.getUserProfile);
//# sourceMappingURL=auth.js.map