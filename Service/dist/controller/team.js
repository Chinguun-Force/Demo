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
exports.updateTeam = exports.getTeamByIdWithPlayersAndOwner = exports.getAllTeams = exports.createTeam = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const team_1 = require("../schema/team");
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const team = yield team_1.Team.create(req.body);
        res.status(201).json({ success: true, team });
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Team already exists" });
        }
        else {
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
});
exports.createTeam = createTeam;
const getAllTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield team_1.Team.find();
        res.status(200).json({ success: true, teams });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.getAllTeams = getAllTeams;
const getTeamByIdWithPlayersAndOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamId } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(teamId)) {
            return res.status(400).json({ success: false, message: "Invalid team ID" });
        }
        const team = yield team_1.Team.aggregate([
            {
                $match: { _id: new mongoose_1.default.Types.ObjectId(teamId) }
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
            }
        ]);
        if (team.length === 0) {
            return res.status(404).json({ success: false, message: "Team not found" });
        }
        res.status(200).json({ success: true, team: team[0] });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.getTeamByIdWithPlayersAndOwner = getTeamByIdWithPlayersAndOwner;
const updateTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamId } = req.params;
    const updateData = Object.assign({}, req.body);
    const team = yield team_1.Team.findByIdAndUpdate(teamId, updateData, { new: true });
    res.status(200).json({ success: true, team });
});
exports.updateTeam = updateTeam;
//# sourceMappingURL=team.js.map