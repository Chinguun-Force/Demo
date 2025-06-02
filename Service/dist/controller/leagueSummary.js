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
const leagueSummary_1 = __importDefault(require("../schema/leagueSummary")); // Adjust the path as necessary
const router = express_1.default.Router();
// Create a new league summary entry
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leagueSummary = new leagueSummary_1.default(req.body);
        yield leagueSummary.save();
        res.status(201).send(leagueSummary);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// Get all league summaries
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leagueSummaries = yield leagueSummary_1.default.find();
        res.status(200).send(leagueSummaries);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Get a specific league summary entry by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leagueSummary = yield leagueSummary_1.default.findById(req.params.id);
        if (!leagueSummary) {
            return res.status(404).send();
        }
        res.status(200).send(leagueSummary);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Update a league summary entry by ID
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leagueSummary = yield leagueSummary_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!leagueSummary) {
            return res.status(404).send();
        }
        res.status(200).send(leagueSummary);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// Delete a league summary entry by ID
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leagueSummary = yield leagueSummary_1.default.findByIdAndDelete(req.params.id);
        if (!leagueSummary) {
            return res.status(404).send();
        }
        res.status(200).send(leagueSummary);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = router;
//# sourceMappingURL=leagueSummary.js.map