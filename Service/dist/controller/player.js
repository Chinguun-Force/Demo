"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlayer = exports.getAllPlayers = exports.getUserProfile = exports.getProfileById = exports.createPlayer = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const player_1 = require("../schema/player");
const mongoose_1 = __importDefault(require("mongoose"));
const createPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ");
        const decode = jsonwebtoken_1.default.verify(token[1], process.env.ACCESS_TOKEN_SECRET_KEY);
        const userId = (typeof decode === 'object' && decode !== null && 'user' in decode && typeof decode.user === 'object')
            ? decode.user._id
            : undefined;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        const player = yield player_1.Player.create(Object.assign(Object.assign({}, req.body), { userId }));
        res.status(201).json({ success: true, player });
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Player already exists" });
        }
        else {
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
});
exports.createPlayer = createPlayer;
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playerId = req.params.id;
        console.log("Received playerId:", playerId);
        if (!mongoose_1.default.Types.ObjectId.isValid(playerId)) {
            return res.status(400).json({ error: "Invalid playerId format" });
        }
        const playerProfile = yield player_1.Player.aggregate([
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(playerId)
                }
            },
            {
                $lookup: {
                    from: 'playerstats',
                    localField: '_id',
                    foreignField: 'playerId',
                    as: 'stats'
                }
            },
            {
                $unwind: {
                    path: '$stats',
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);
        if (!playerProfile.length) {
            return res.status(404).json({ error: "Player not found" });
        }
        res.json(playerProfile[0]);
    }
    catch (error) {
        console.error('Error fetching player profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getProfileById = getProfileById;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [_, token] = req.headers["authorization"].split(" ");
        const decode = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        console.log(decode);
        const userId = (typeof decode === 'object' && decode !== null && 'user' in decode && typeof decode.user === 'object')
            ? decode.user._id
            : undefined;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        const player = yield player_1.Player.findOne({ userId: userId });
        if (!player) {
            return res.status(404).json({ success: false, message: "Player not found" });
        }
        res.status(200).json({ success: true, player });
    }
    catch (error) {
    }
});
exports.getUserProfile = getUserProfile;
const getAllPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const players = yield player_1.Player.find();
        res.status(200).json({ success: true, players });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.getAllPlayers = getAllPlayers;
const updatePlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("bearer ")) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        const userId = (typeof decoded === 'object' && decoded !== null && 'user' in decoded && typeof decoded.user === 'object')
            ? decoded.user._id
            : undefined;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        const profile = yield player_1.Player.findOneAndUpdate({ userId: userId }, req.body, { new: true });
        if (!profile) {
            return res.status(404).json({ success: false, message: "Player not found" });
        }
        res.json({ success: true, profile });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.updatePlayer = updatePlayer;
//# sourceMappingURL=player.js.map