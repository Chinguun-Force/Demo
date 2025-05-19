import jwt from 'jsonwebtoken';
import { Player } from '../schema/player';

export const createPlayer = async (req, res) => {
    try {
        const [_, token] = req.headers["authorization"].split(" ");
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        const userId = (typeof decode === 'object' && decode !== null && 'user' in decode && typeof (decode as any).user === 'object')
            ? (decode as any).user._id
            : undefined;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        const player = await Player.create({ ...req.body, userId });
        res.status(201).json({ success: true, player });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Player already exists" });
        } else {
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
}

export const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).json({ success: true, players });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}