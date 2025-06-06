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
exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../schema/user");
const saltRounds = 12;
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.";
    }
    return null;
};
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        // Validate password
        const passwordError = validatePassword(password);
        if (passwordError) {
            return res.status(400).json({ success: false, message: passwordError });
        }
        const salt = bcrypt_1.default.genSaltSync(saltRounds);
        const hash = bcrypt_1.default.hashSync(password, salt);
        const user = yield user_1.User.create(Object.assign(Object.assign({}, req.body), { password: hash }));
        res.status(201).json({ success: true, user });
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: "User already exists" });
        }
        else {
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.User.findOne({ email: email });
    if (!user) {
        res
            .status(404)
            .json({ success: false, error: "Username or password is wrong" });
        return;
    }
    const isCompare = bcrypt_1.default.compareSync(password, user.password);
    if (!isCompare) {
        res
            .status(401)
            .json({ success: false, error: "Username or password is wrong" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ user }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: "1h",
    });
    res.status(200).json({ success: true, token });
});
exports.login = login;
//# sourceMappingURL=auth.js.map