"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerRouter = void 0;
const express_1 = require("express");
const player_1 = require("../controller/player");
const checktoken_1 = require("../middleware/checktoken");
const playerRouter = (0, express_1.Router)();
exports.playerRouter = playerRouter;
playerRouter
    .post('/', checktoken_1.checkToken, player_1.createPlayer)
    .get('/', player_1.getAllPlayers)
    .get('/:id', player_1.getProfileById)
    .put('/', player_1.updatePlayer);
//# sourceMappingURL=player.js.map