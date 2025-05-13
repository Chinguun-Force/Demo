"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter
    .post('/sign-up', auth_1.signUp)
    .post('/login', auth_1.login)
    .post('/forgot-password', auth_1.forgotPassword);
//# sourceMappingURL=auth.js.map