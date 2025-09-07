"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Routes/statistics.ts
const express_1 = __importDefault(require("express"));
const statisticsController_1 = require("../controllers/statisticsController");
const router = express_1.default.Router();
router.put('/', statisticsController_1.updateDiseaseStatistic);
router.get('/', statisticsController_1.getStatisticsAll);
exports.default = router;
