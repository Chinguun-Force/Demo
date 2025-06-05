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
        type: Object,
        default: {},
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
    }
});
export const Team = mongoose.model("Team", teamSchema);