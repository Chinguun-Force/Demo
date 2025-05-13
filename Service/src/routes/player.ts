import { Router } from 'express';
import { createPlayer, getAllPlayers } from '../controller/player';
import { checkToken } from '../middleware/checktoken';

const playerRouter = Router();

playerRouter
.post('/',checkToken, createPlayer)
.get('/', getAllPlayers);

export { playerRouter };