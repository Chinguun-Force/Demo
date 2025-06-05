import jwt from "jsonwebtoken";
import mongoose from "mongoose";
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
export const getTeamByIdWithPlayersAndOwner = async (req, res) => {
    const { teamId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(teamId)) {
            return res.status(400).json({ success: false, message: "Invalid team ID" });
        }

        const team = await Team.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(teamId) }
            },
            {
                $lookup: {
                    from: "players",
                    localField: "teamMembers",
                    foreignField: "_id",
                    as: "teamMembersDetails"
                }
            },
            {
                $lookup: {
                    from: "owners",
                    localField: "teamOwner",
                    foreignField: "_id",
                    as: "ownerDetails"
                }
            },
            {
                $unwind: {
                    path: "$ownerDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    teamName: 1,
                    teamNameEn: 1,
                    teamLogo: 1,
                    teamDescription: 1,
                    teamAchievements: 1,
                    teamStats: 1,
                    teamSocialLinks: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    isActive: 1,
                    teamMembers: "$teamMembersDetails",
                    teamOwner: "$ownerDetails"
                }
            }
        ]);

        if (team.length === 0) {
            return res.status(404).json({ success: false, message: "Team not found" });
        }

        res.status(200).json({ success: true, team: team[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};