"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.resetRequest = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../schema/user");
const saltRounds = 12;
const resetRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield user_1.User.findOne({ email: email });
    if (!user) {
        res.json({ message: "User not found" });
        return;
    }
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "player.crm4040@gmail.com",
            pass: "yjrnxnzkhcxclqgb",
        },
    });
    const token = jsonwebtoken_1.default.sign({ user }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: "1h",
    });
    const info = yield transporter.sendMail({
        from: "Food delivery service", // sender address
        to: email, // list of receivers
        subject: "Нууц үг солих хүсэлт", // Subject line
        html: `
        <h1>Reset password</h1>
        <p>Click <a href="http://localhost:3000/reset-password?token=${token}"> <button style="padding: 6px 12px; background-color: #3768FF; text: #FFF;">here </button> </a>  to reset your password</p>
      `,
    });
    console.log(info);
    res.json({ message: "Mail sent" });
});
exports.resetRequest = resetRequest;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, password } = req.body;
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    const hash = bcrypt_1.default.hashSync(password, salt);
    const user = yield user_1.User.findByIdAndUpdate(_id, { password: hash });
    console.log(user);
    res.json({ success: true });
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=reset-password.js.map