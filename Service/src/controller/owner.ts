import jwt from "jsonwebtoken";
import { Owner } from "../schema/owner";

export const createOwner = async (req, res) => {
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
        const owner = await Owner.create({ ...req.body, userId });
        res.status(201).json({ success: true, owner });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Owner already exists" });
        } else {
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
}
export const updateOwner = async (req, res) => {
    try {
        const { ownerId } = req.params;
        const updatedOwner = await Owner.findByIdAndUpdate(ownerId, req.body, { new: true });
        if (!updatedOwner) {
            return res.status(404).json({ success: false, message: "Owner not found" });
        }
        res.status(200).json({ success: true, updatedOwner });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}