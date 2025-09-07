"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const users_1 = __importDefault(require("./routes/users"));
const roles_1 = __importDefault(require("./routes/roles"));
const upload_1 = __importDefault(require("./routes/upload"));
const disease_1 = __importDefault(require("./routes/disease"));
const statistics_1 = __importDefault(require("./routes/statistics"));
const ricevariety_1 = __importDefault(require("./routes/ricevariety"));
const seed_1 = require("./seed");
const analysisController_1 = require("./controllers/analysisController");
const statisticsController_1 = require("./controllers/statisticsController");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";
//Middleware
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://barcelona-galaxy-liberty-per.trycloudflare.com"
    ],
    credentials: true
}));
app.options('*', (0, cors_1.default)());
app.use(express_1.default.json());
// ไว้เช็คว่าเรียกใช้ option ต่างๆ ผ่านมั้ย
app.use((0, morgan_1.default)('[:method] :url :status - :response-time ms'));
app.use((err, _req, res, _next) => {
    console.error(`❌ Error: ${err.message}`);
    res.status(err.status || 500).json({ error: err.message });
});
//Route ไว้ทดสอบว่า server รันได้มั้ย
app.get('/', (_req, res) => {
    res.send('🌾 Rice Disease API is running');
});
//Routes ต่างๆ
app.use('/users', users_1.default);
app.use('/roles', roles_1.default);
app.use('/uploads', upload_1.default);
app.use('/disease', disease_1.default);
app.use('/Statistic', statistics_1.default);
app.use('/RiceVariety', ricevariety_1.default);
//เริ่มต้น server
async function startServer() {
    if (process.env.NODE_ENV === "test") {
        app.use((req, res, next) => {
            if (req.body && req.body.imageID) {
                res.locals.analysisData = req.body;
            }
            next();
        });
        app.post("/analysis/save", analysisController_1.saveAnalysisResult);
        app.put("/Statistic", statisticsController_1.updateDiseaseStatistic);
        app.get("/Statistic", statisticsController_1.getStatisticsAll);
    }
    await (0, seed_1.seedRoles)();
    await (0, seed_1.seedDiseaseInformations)();
    await (0, seed_1.seedDeficiencySolutions)();
    await (0, seed_1.seedUsers)();
    await (0, seed_1.seedRegions)();
    await (0, seed_1.seedProvinces)();
    await (0, seed_1.seedRiceVariety)();
    await (0, seed_1.seedMorphology)();
    await (0, seed_1.seedStrength)();
    await (0, seed_1.seedWeaknesse)();
    if (require.main === module) {
        app.listen(PORT, HOST, () => {
            console.log(`Server running on http://${HOST}:${PORT}`);
        });
    }
}
startServer();
exports.default = app;
