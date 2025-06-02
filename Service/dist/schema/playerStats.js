"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PlayerStatsSchema = new mongoose_1.default.Schema({
    playerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    gamesPlayed: {
        type: Number,
        required: true
    }, // "G"
    minutes: {
        type: Number,
        required: true
    }, // "MIN"
    fieldGoals: {
        made: {
            type: Number,
            required: true
        },
        attempted: {
            type: Number,
            required: true
        },
        percentage: {
            type: Number,
            required: true
        } // "FG%"
    },
    threePoints: {
        made: {
            type: Number,
            required: true
        },
        attempted: {
            type: Number,
            required: true
        },
        percentage: {
            type: Number,
            required: true
        } // "3P%"
    },
    freeThrows: {
        made: {
            type: Number,
            required: true
        },
        attempted: {
            type: Number,
            required: true
        },
        percentage: {
            type: Number,
            required: true
        } // "FT%"
    },
    rebounds: {
        offensive: {
            type: Number,
            required: true
        }, // "RO"
        defensive: {
            type: Number,
            required: true
        }, // "RD"
        total: {
            type: Number,
            required: true
        } // "REB"
    },
    assists: {
        type: Number,
        required: true
    }, // "AST"
    personalFouls: {
        type: Number,
        required: true
    }, // "PF"
    steals: {
        type: Number,
        required: true
    }, // "ST"
    blocks: {
        type: Number,
        required: true
    }, // "BS"
    turnovers: {
        type: Number,
        required: true
    }, // "TO"
    points: {
        type: Number,
        required: true
    }, // "PTS"
    rank: {
        type: Number,
        required: true
    } // "RNK"
});
const PlayerStats = mongoose_1.default.model('PlayerStats', PlayerStatsSchema);
exports.default = PlayerStats;
//# sourceMappingURL=playerStats.js.map