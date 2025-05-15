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
exports.getAllPlayers = exports.createPlayer = void 0;
const player_1 = require("../schema/player");
const createPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = yield player_1.Player.create(req.body);
        res.status(201).json({ success: true, player });
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Player already exists" });
        }
        else {
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
});
exports.createPlayer = createPlayer;
const getAllPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const players = yield player_1.Player.find();
        res.status(200).json({ success: true, players });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.getAllPlayers = getAllPlayers;
//# sourceMappingURL=player.js.map