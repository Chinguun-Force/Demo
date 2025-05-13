"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const playerSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        require: true,
        unique: true,
    },
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    height: {
        type: Number,
        require: true,
    },
    weight: {
        type: Number,
        require: true,
    },
    position: {
        type: String,
        require: true,
    },
    team: {
        type: String,
    },
    jerseyNumber: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "INJURED", "SUSPENDED"],
        default: "INACTIVE",
    },
    bio: {
        type: String,
    },
    stats: {
        type: Object,
        default: {},
    },
    careerHistory: {
        type: [String],
        default: [],
    },
    achievements: {
        type: [String],
        default: [],
    },
    socialLinks: {
        type: [String],
        default: {},
    }
});
//# sourceMappingURL=player.js.map