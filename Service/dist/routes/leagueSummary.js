"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leagueSummary_1 = __importDefault(require("../controller/leagueSummary")); // Adjust the path as necessary
const router = express_1.default.Router();
// Use the leagueSummaryController for all /league-summary routes
router.use('/', leagueSummary_1.default);
exports.default = router;
//# sourceMappingURL=leagueSummary.js.map