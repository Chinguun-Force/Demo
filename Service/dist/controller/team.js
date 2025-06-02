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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTeams = exports.createTeam = void 0;
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
//# sourceMappingURL=team.js.map