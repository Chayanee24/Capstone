"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../src/index"));
const statisticsService_1 = require("../src/services/statisticsService");
jest.mock("../src/services/statisticsService", () => ({
    __esModule: true,
    updateDiseaseStatisticService: jest.fn(),
    getAllStatisticsService: jest.fn(),
}));
describe("StatisticsController", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("POST /statistics/update", () => {
        it("อัปเดตสถิติสำเร็จ", async () => {
            statisticsService_1.updateDiseaseStatisticService.mockResolvedValue({
                success: true,
                diseaseName: "โรคใบขอบแห้ง",
            });
            const res = await (0, supertest_1.default)(index_1.default)
                .put("/Statistic")
                .send({
                diseaseName: "โรคใบขอบแห้ง",
                latitude: 15.0,
                longitude: 100.0,
            });
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.diseaseName).toBe("โรคใบขอบแห้ง");
            expect(statisticsService_1.updateDiseaseStatisticService).toHaveBeenCalledWith("โรคใบขอบแห้ง", 15.0, 100.0);
        });
        it("อัปเดตสถิติไม่ได้", async () => {
            statisticsService_1.updateDiseaseStatisticService.mockRejectedValue(new Error("DB error"));
            const res = await (0, supertest_1.default)(index_1.default).put("/Statistic").send({
                diseaseName: "โรคใบขอบแห้ง",
                latitude: 15.0,
                longitude: 100.0,
            });
            expect(res.status).toBe(400);
            expect(res.body.error).toBe("DB error");
        });
    });
    describe("GET statistics/all", () => {
        it("ดึงข้อมูลสถิติสำเร็จ", async () => {
            statisticsService_1.getAllStatisticsService.mockResolvedValue([
                { diseaseName: "โรคใบขอบแห้ง", count: 10 },
                { diseaseName: "โรคไหม้", count: 5 },
            ]);
            const res = await (0, supertest_1.default)(index_1.default).get("/Statistic");
            expect(res.status).toBe(200);
            expect(res.body.data).toHaveLength(2);
            expect(res.body.data[0].diseaseName).toBe("โรคใบขอบแห้ง");
            expect(statisticsService_1.getAllStatisticsService).toHaveBeenCalled();
        });
        it("ดึงข้อมูลสถิติไม่ได้", async () => {
            statisticsService_1.getAllStatisticsService.mockRejectedValue(new Error("Service unavailable"));
            const res = await (0, supertest_1.default)(index_1.default).get("/Statistic");
            expect(res.status).toBe(400);
            expect(res.body.error).toBe("Service unavailable");
        });
    });
});
