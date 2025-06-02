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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playerStats_1 = __importDefault(require("../schema/playerStats")); // Adjust the path as necessary
const router = express_1.default.Router();
// Create a new player stats entry
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playerStats = new playerStats_1.default(req.body);
        yield playerStats.save();
        res.status(201).send(playerStats);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// Get all player stats
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playerStats = yield playerStats_1.default.find();
        res.status(200).send(playerStats);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Get a specific player stats entry by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playerStats = yield playerStats_1.default.findById(req.params.id);
        if (!playerStats) {
            return res.status(404).send();
        }
        res.status(200).send(playerStats);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Update a player stats entry by ID
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playerStats = yield playerStats_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!playerStats) {
            return res.status(404).send();
        }
        res.status(200).send(playerStats);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// Delete a player stats entry by ID
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playerStats = yield playerStats_1.default.findByIdAndDelete(req.params.id);
        if (!playerStats) {
            return res.status(404).send();
        }
        res.status(200).send(playerStats);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = router;
//# sourceMappingURL=playerStats.js.map