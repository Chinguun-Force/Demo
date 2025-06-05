import { Router } from "express";
import { createTeam, getAllTeams, getTeamByIdWithPlayersAndOwner, updateTeam } from "../controller/team";

const teamRouter = Router();

teamRouter
    .post('/', createTeam)
    .get('/', getAllTeams)
    .get("/:teamId", getTeamByIdWithPlayersAndOwner)
    .put("/:teamId", updateTeam);

export { teamRouter};