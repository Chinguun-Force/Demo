import { Player } from '../schema/player';

export const createPlayer = async (req, res) => {
    try {
        const player = await Player.create(req.body);
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