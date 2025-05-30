import mongoose from "mongoose";

const PlayerStatsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    gamesPlayed: {
        type: Number,
        default: 0,
        // required: true,
    },
    minutesPlayed: {
        type: Number,
        default: 0,
        // required: true,
    },
    fieldGoals:{
        made: {
            type: Number,
            default: 0,
        },
        attempts: {
            type: Number,
            default: 0,
        },
        percentage: {
            type: Number,
            default: 0,
        },
    },
    threePointers: {
        made: {
            type: Number,
            default: 0,
        },
        attempts: {
            type: Number,
            default: 0,
        },
        percentage: {
            type: Number,
            default: 0,
        },
    },
    freeThrows: {
        made: {
            type: Number,
            default: 0,
        },
        attempts: {
            type: Number,
            default: 0,
        },  
        percentage: {
            type: Number,
            default: 0,
        },
    },
    rebounds: {
        offensive: {
            type: Number,
            default: 0,
        },
        defensive: {
            type: Number,
            default: 0,
        },
        total: {
            type: Number,
            default: 0,
        },
    },
    assists: {
        type: Number,
        default: 0,
    },
    personalFouls: {
        type: Number,
        default: 0,
    },
    steals: {
        type: Number,
        default: 0,
    },
    blocks: {
        type: Number,
        default: 0,
    },
    turnovers: {
        type: Number,
        default: 0,
    },
    points: {
        type: Number,
        default: 0,
    },
    rank: {
        type: Number,
        default: 0,
        // required: true,
    }});

const PlayerStats = mongoose.model("PlayerStats", PlayerStatsSchema);
export default PlayerStats;