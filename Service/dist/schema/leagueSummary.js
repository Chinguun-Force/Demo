"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LeagueSummarySchema = new mongoose_1.default.Schema({
    teamId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    pointsPerGame: {
        type: Number
    },
    twoPointPercentage: {
        type: Number
    }, // "2FGP%"
    threePointPercentage: {
        type: Number
    }, // "3FGP%"
    freeThrowPercentage: {
        type: Number
    }, // "FT%"
    offensiveRebounds: {
        type: Number
    }, // "Off rebounds"
    defensiveRebounds: {
        type: Number
    }, // "Def rebounds"
    totalRebounds: {
        type: Number
    }, // "Total rebounds"
    assistsPerGame: {
        type: Number
    },
    turnoversPerGame: {
        type: Number
    },
    stealsPerGame: {
        type: Number
    },
    blocksPerGame: {
        type: Number
    },
    opponentPointsPerGame: {
        type: Number
    }, // "Points per game of opponent"
    opponentTwoPointPercentage: {
        type: Number
    },
    opponentThreePointPercentage: {
        type: Number
    }
});
const LeagueSummary = mongoose_1.default.model('LeagueSummary', LeagueSummarySchema);
exports.default = LeagueSummary;
//# sourceMappingURL=leagueSummary.js.map