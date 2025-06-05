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
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("./utils/connection");
const auth_1 = require("./routes/auth");
const player_1 = require("./routes/player");
const owner_1 = require("./routes/owner");
const team_1 = require("./routes/team");
const stats_1 = __importDefault(require("./routes/stats"));
const leagueSummary_1 = __importDefault(require("./routes/leagueSummary"));
dotenv_1.default.config();
const port = 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/test', (req, res) => {
    res.send('Test Route');
});
app.get('/api', (req, res) => {
    res.send('API Route');
});
app.use('/api/v1/auth', auth_1.authRouter);
app.use('/api/v1/players', player_1.playerRouter);
app.use('/api/v1/owner', owner_1.ownerRouter);
app.use('/api/v1/teams', team_1.teamRouter);
app.use('/api/v1/stats', stats_1.default);
app.use('/api/v1/league-summary', leagueSummary_1.default);
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connection_1.connection)();
    }
    catch (err) {
        console.error(err);
    }
});
connectDb();
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on port ${port}`);
}));
//# sourceMappingURL=index.js.map