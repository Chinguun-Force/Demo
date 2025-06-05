import { Router } from 'express';
import { createPlayer, getAllPlayers, getProfileById, updatePlayer } from '../controller/player';
import { checkToken } from '../middleware/checktoken';

const playerRouter = Router();

playerRouter
.post('/',
    // checkToken, 
    createPlayer)
.get('/', getAllPlayers)
.get('/:id', getProfileById)
.put('/', updatePlayer)
export { playerRouter };