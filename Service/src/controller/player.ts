import jwt from 'jsonwebtoken';
import {Player} from '../schema/player';
import {Team} from '../schema/team';
import mongoose from 'mongoose';

export const createPlayer = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ");
        const decode = jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET_KEY);
        const userId = (
            typeof decode === 'object' && decode !== null && 'user' in decode && typeof(decode as any).user === 'object'
        )
            ? (decode as any).user._id
            : undefined;
        if (!userId) {
            return res
                .status(401)
                .json({success: false, message: "Invalid token"});
        }
        const playerData = req.body;
        const player = await Player.create({
            ...req.body,
            userId
        });
        res
            .status(201)
            .json({success: true, player});
        if (playerData.team) {
            await Team.findByIdAndUpdate(playerData.team, {
                $addToSet: {
                    teamMembers: player._id
                },
                $set: {
                    updatedAt: new Date()
                }
            });
        }
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res
                .status(400)
                .json({success: false, message: "Player already exists"});
        } else {
            res
                .status(500)
                .json({success: false, message: "Server error"});
        }
    }
}
export const getProfileById = async (req, res) => {
    try {
        const playerId = req.params.id;

        console.log("Received playerId:", playerId);

        if (!mongoose.Types.ObjectId.isValid(playerId)) {
            return res
                .status(400)
                .json({error: "Invalid playerId format"});
        }

        const playerProfile = await Player.aggregate([
            {
                $lookup: {
                    from: 'playerstats',
                    localField: '_id',
                    foreignField: 'playerId',
                    as: 'stats'
                }
            }, {
                $lookup: {
                    from: 'teams',
                    localField: 'team',
                    foreignField: '_id',
                    as: 'teamInfo'
                }
            }
        ]);

        if (!playerProfile.length) {
            return res
                .status(404)
                .json({error: "Player not found"});
        }

        res.json(playerProfile[0]);
    } catch (error) {
        console.error('Error fetching player profile:', error);
        res
            .status(500)
            .json({error: 'Server error'});
    }
};
export const getUserProfile = async (req, res) => {
    try {
        const [_, token] = req
            .headers["authorization"]
            .split(" ");
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        console.log(decode)
        const userId = (
            typeof decode === 'object' && decode !== null && 'user' in decode && typeof(decode as any).user === 'object'
        )
            ? (decode as any).user._id
            : undefined;
        if (!userId) {
            return res
                .status(401)
                .json({success: false, message: "Invalid token"});
        }
        const player = await Player.findOne({userId: userId});
        if (!player) {
            return res
                .status(404)
                .json({success: false, message: "Player not found"});
        }
        res
            .status(200)
            .json({success: true, player});
    } catch (error) {}
}

export const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res
            .status(200)
            .json({success: true, players});
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({success: false, message: "Server error"});
    }
}

export const updatePlayer = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("bearer ")) {
            return res
                .status(401)
                .json({success: false, message: "Unauthorized"});
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

        const userId = (
            typeof decoded === 'object' && decoded !== null && 'user' in decoded && typeof(decoded as any).user === 'object'
        )
            ? (decoded as any).user._id
            : undefined;
        if (!userId) {
            return res
                .status(401)
                .json({success: false, message: "Invalid token"});
        }

        const profile = await Player.findOneAndUpdate({
            userId: userId
        }, req.body, {new: true});

        if (!profile) {
            return res
                .status(404)
                .json({success: false, message: "Player not found"});
        }

        res.json({success: true, profile});
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({success: false, message: "Server error"});
    }
};