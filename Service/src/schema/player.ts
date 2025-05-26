import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    profilePicture: {
        type : String,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.veryicon.com%2Ficons%2Fmiscellaneous%2Fstandard%2Favatar-15.html&psig=AOvVaw3PR-6EQWshyT4t4sta0c9P&ust=1748311627649000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDumcCGwI0DFQAAAAAdAAAAABAE",
    },
    name: {
        type : String,
        require : true,
    },
    age: {
        type : Number,
        require : true,
    },
    height: {
        type : Number,
        require : true,
    },
    weight: {
        type : Number,
        require : true,
    },
    position: {
        type : String,
        
    },
    team: {
        type : String,
    },
    jerseyNumber: {
        type : Number,
        
    },
    status: {
        type : String,
        enum : ["ACTIVE", "INACTIVE", "INJURED", "SUSPENDED"],
        default : "INACTIVE",
    },
    bio: {
        type : String,
    },
    stats:{
        type : Object,
        default : {},
    },
    careerHistory: {
        type : [String],
        default : [],
    },
    achievements: {
        type : [String],
        default : [],
    },
    socialLinks: {
        type : [String],
        default : {},
    }
})
export const Player = mongoose.model("Player", playerSchema);