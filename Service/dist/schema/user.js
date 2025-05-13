"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    phoneNumber: String,
    address: String,
    role: {
        type: String,
        enum: ["ADMIN", "FAN", "OWNER", "PLAYER"]
    },
    isVerified: Boolean,
}, {
    timestamps: true
});
exports.User = mongoose_1.default.model("user", userSchema);
//# sourceMappingURL=user.js.map