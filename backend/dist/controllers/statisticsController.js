"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatisticsAll = exports.updateDiseaseStatistic = void 0;
const statisticsService_1 = require("../services/statisticsService");
const updateDiseaseStatistic = async (req, res) => {
    try {
        const { diseaseName, latitude, longitude } = req.body;
        const result = await (0, statisticsService_1.updateDiseaseStatisticService)(diseaseName, latitude, longitude);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateDiseaseStatistic = updateDiseaseStatistic;
const getStatisticsAll = async (_req, res) => {
    try {
        const data = await (0, statisticsService_1.getAllStatisticsService)();
        res.json({ data });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getStatisticsAll = getStatisticsAll;
