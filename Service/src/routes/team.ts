import { Router } from "express";
import { createTeam, getAllTeams } from "../controller/team";

const teamRouter = Router();

teamRouter
    .post('/', createTeam)
    .get('/', getAllTeams)

export { teamRouter};