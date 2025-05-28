import jwt from "jsonwebtoken";
import { Team } from "../schema/team";

export const createTeam = async (req, res) => {
    try {
        const team = await Team.create(req.body);
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
export const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json({ success: true, teams });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};