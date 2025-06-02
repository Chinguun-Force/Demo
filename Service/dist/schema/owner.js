"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Owner = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ownerSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    profilePicture: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.veryicon.com%2Ficons%2Fmiscellaneous%2Fstandard%2Favatar-15.html&psig=AOvVaw3PR-6EQWshyT4t4sta0c9P&ust=1748311627649000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDumcCGwI0DFQAAAAAdAAAAABAE",
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    firstnameEn: {
        type: String,
    },
    lastnameEn: {
        type: String,
    },
    ownTeamId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Team",
        // required: true,
    }
});
exports.Owner = mongoose_1.default.model("Owner", ownerSchema);
//# sourceMappingURL=owner.js.map