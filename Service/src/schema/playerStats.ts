import mongoose from 'mongoose';

const PlayerStatsSchema = new mongoose.Schema({
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
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

const PlayerStats = mongoose.model('PlayerStats', PlayerStatsSchema);

export default PlayerStats;
