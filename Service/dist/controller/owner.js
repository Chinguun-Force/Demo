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
exports.updateOwner = exports.createOwner = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const owner_1 = require("../schema/owner");
const createOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ");
        const decode = jsonwebtoken_1.default.verify(token[1], process.env.ACCESS_TOKEN_SECRET_KEY);
        const userId = (typeof decode === 'object' && decode !== null && 'user' in decode && typeof decode.user === 'object')
            ? decode.user._id
            : undefined;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        const owner = yield owner_1.Owner.create(Object.assign(Object.assign({}, req.body), { userId }));
        res.status(201).json({ success: true, owner });
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Owner already exists" });
        }
        else {
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
});
exports.createOwner = createOwner;
const updateOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerId } = req.params;
        const updatedOwner = yield owner_1.Owner.findByIdAndUpdate(ownerId, req.body, { new: true });
        if (!updatedOwner) {
            return res.status(404).json({ success: false, message: "Owner not found" });
        }
        res.status(200).json({ success: true, updatedOwner });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.updateOwner = updateOwner;
//# sourceMappingURL=owner.js.map