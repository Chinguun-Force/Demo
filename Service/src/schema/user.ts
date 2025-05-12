import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type : String,
        require: true,
        unique : true,
    },
    password: {
        type : String,
        require : true,
    },
    phoneNumber : String,
    address: String,
    role: {
        type : String,
        enum : ["ADMIN", "FAN","OWNER","PLAYER"]
    },
    isVerified: Boolean,
},
{
    timestamps : true
})
export const User =  mongoose.model("user", userSchema);