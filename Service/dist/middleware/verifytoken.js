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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers["authorization"]) {
            res.status(401).json({ success: false, msg: "token is missing" });
            return;
        }
        const [_, token] = req.headers["authorization"].split(" ");
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, error: error.message });
    }
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifytoken.js.map