import { Router } from "express";
import { createTeam } from "../controller/team";

const teamRouter = Router();

teamRouter
    .post('/', createTeam)

export { teamRouter};