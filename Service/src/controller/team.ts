import jwt from "jsonwebtoken";
import { Team } from "../schema/team";

export const createTeam = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ");
        const decode = jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET_KEY);
        const userId = (typeof decode === 'object' && decode !== null && 'user' in decode && typeof (decode as any).user === 'object')
            ? (decode as any).user._id
            : undefined;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        const team = await Team.create({ ...req.body, userId });
        res.status(201).json({ success: true, team });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Team already exists" });
        } else {
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
};