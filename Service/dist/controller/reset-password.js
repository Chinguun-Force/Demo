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
exports.forgotPassword = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const saltRounds = 12;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { email } = req.body;
    // const user = await User.findOne({email:email});
    // if (!user) {
    //     res.status(404).json({ success: false, error: 'User not found' });
    //     return;
    // }
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "chinguunbats9@gmail.com",
            pass: "jaqiglfgezugldvf",
        },
    });
    const info = yield transporter.sendMail({
        from: "Test", // sender address
        to: "chinguunbats9@gmail.com", // list of receivers
        subject: "Reset password", // Subject line
        html: `
          <h1>Reset password</h1>
          <p>Click<button style="padding: 6px 12px; background-color: #3768FF; text: #FFF;">here </button> </a>  to reset your password</p>
        `,
    });
    console.log(info);
    res.json({ message: "Mail sent" });
});
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=reset-password.js.map