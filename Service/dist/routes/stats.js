"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playerStats_1 = __importDefault(require("../controller/playerStats")); // Adjust the path as necessary
const router = express_1.default.Router();
// Use the playerStatsController for all /player-stats routes
router.use('/player-stats', playerStats_1.default);
exports.default = router;
//# sourceMappingURL=stats.js.map