import { Router } from "express";
import { createTeam, getAllTeams, getTeamByIdWithPlayersAndOwner } from "../controller/team";

const teamRouter = Router();

teamRouter
    .post('/', createTeam)
    .get('/', getAllTeams)
    .get("/:teamId", getTeamByIdWithPlayersAndOwner);

export { teamRouter};