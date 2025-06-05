"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRouter = void 0;
const express_1 = require("express");
const team_1 = require("../controller/team");
const teamRouter = (0, express_1.Router)();
exports.teamRouter = teamRouter;
teamRouter
    .post('/', team_1.createTeam)
    .get('/', team_1.getAllTeams)
    .get("/:teamId", team_1.getTeamByIdWithPlayersAndOwner)
    .put("/:teamId", team_1.updateTeam)
    .patch("/:teamId", team_1.updateTeam);
//# sourceMappingURL=team.js.map