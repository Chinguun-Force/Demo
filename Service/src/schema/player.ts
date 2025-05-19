import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
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