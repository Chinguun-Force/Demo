import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    teamNameEn: {
        type: String,
        required: true,
    },
    teamName: {
        type: String,
        required: true,
    },
    teamLogo: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.veryicon.com%2Ficons%2Fmiscellaneous%2Fstandard%2Favatar-15.html&psig=AOvVaw3PR-6EQWshyT4t4sta0c9P&ust=1748311627649000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDumcCGwI0DFQAAAAAdAAAAABAE",
    },
    teamDescription: {
        type: String,
        default: "No description provided",
    },
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",  
    }],
    // teamOwner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Owner",
    //     required: true,
    // },
    teamAchievements: {
        type: [String],
        default: [],
    },
    teamStats: {
        pointsPerGame: { type: String, default: "0" },
        twoFGP: { type: String, default: "0%" },
        threeFGP: { type: String, default: "0%" },
        freeThrowPercentage: { type: String, default: "0%" },
        offRebounds: { type: String, default: "0" },
        defRebounds: { type: String, default: "0" },
        totalRebounds: { type: String, default: "0" },
        assistsPerGame: { type: String, default: "0" },
        turnoversPerGame: { type: String, default: "0" },
        stealsPerGame: { type: String, default: "0" },
        blocksPerGame: { type: String, default: "0" },
        pointsPerGameOfOpponent: { type: String, default: "0" },
        opponentTwoFGP: { type: String, default: "0%" },
        opponentThreeFGP: { type: String, default: "0%" },
    },
    teamSocialLinks: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    games: [{
        date: { type: String, required: true },
        league: { type: String, enum:["Play-Off","Semi-Final","Final"] },
        round: { type: Number, required: true },
        opponent: { type: String, required: true },
        result: { type: String, required: true },
    }],
});
export const Team = mongoose.model("Team", teamSchema);