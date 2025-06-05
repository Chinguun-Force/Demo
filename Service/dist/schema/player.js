"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const playerSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    profilePicture: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.veryicon.com%2Ficons%2Fmiscellaneous%2Fstandard%2Favatar-15.html&psig=AOvVaw3PR-6EQWshyT4t4sta0c9P&ust=1748311627649000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDumcCGwI0DFQAAAAAdAAAAABAE",
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
    },
    teamId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Team",
    },
    jerseyNumber: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "INJURED", "SUSPENDED"],
        default: "INACTIVE",
    },
    bio: {
        type: String,
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
        default: [],
    }
});
exports.Player = mongoose_1.default.model("Player", playerSchema);
//# sourceMappingURL=player.js.map