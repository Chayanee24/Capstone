"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../src/index")); // Express app
const supabase_1 = __importDefault(require("../src/services/supabase"));
const statisticsService_1 = require("../src/services/statisticsService");
jest.mock("../src/services/supabase", () => ({
    __esModule: true,
    default: {
        from: jest.fn(),
    },
}));
jest.mock("../src/services/statisticsService", () => ({
    __esModule: true,
    updateDiseaseStatisticService: jest.fn(),
}));
describe("AnalysisController - saveAnalysisResult", () => {
    const mockReqData = {
        imageID: 123,
        prediction: "โรคขอบใบแห้ง",
        imageUrl: "http://fake.url/rice.jpg",
    };
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("บันทึกผลการวิเคราะห์สำเร็จ", async () => {
        supabase_1.default.from.mockImplementation((table) => {
            if (table === "DiseaseInformations") {
                return {
                    select: jest.fn().mockReturnThis(),
                    eq: jest.fn().mockReturnThis(),
                    single: jest.fn().mockResolvedValue({
                        data: { id: 99 },
                        error: null,
                    }),
                };
            }
            if (table === "AnalysisResults") {
                return {
                    insert: jest.fn().mockResolvedValue({ data: [{ id: 1 }], error: null }),
                };
            }
            if (table === "RiceImages") {
                return {
                    select: jest.fn().mockReturnThis(),
                    eq: jest.fn().mockReturnThis(),
                    single: jest.fn().mockResolvedValue({
                        data: { latitude: 15.0, longitude: 100.0 },
                        error: null,
                    }),
                };
            }
            return {};
        });
        statisticsService_1.updateDiseaseStatisticService.mockResolvedValue({
            updated: true,
        });
        const res = await (0, supertest_1.default)(index_1.default)
            .post("/analysis/save")
            .send(mockReqData);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Upload + Analysis + Save successful");
        expect(res.body.prediction).toBe(mockReqData.prediction);
        expect(res.body.diseaseId).toBe(99);
        expect(res.body.statisticResult.updated).toBe(true);
        expect(res.body.latitude).toBe(15.0);
        expect(res.body.longitude).toBe(100.0);
    });
    it("หา disease", async () => {
        supabase_1.default.from.mockImplementation((table) => {
            if (table === "DiseaseInformations") {
                return {
                    select: jest.fn().mockReturnThis(),
                    eq: jest.fn().mockReturnThis(),
                    single: jest.fn().mockResolvedValue({
                        data: null,
                        error: { message: "not found" },
                    }),
                };
            }
            return {};
        });
        const res = await (0, supertest_1.default)(index_1.default)
            .post("/analysis/save")
            .send(mockReqData);
        expect(res.status).toBe(500);
        expect(res.body.error).toBe("Disease not found");
    });
    it("บันทึกผลไม่สำเร็จ", async () => {
        supabase_1.default.from.mockImplementation(() => {
            throw new Error("DB crashed");
        });
        const res = await (0, supertest_1.default)(index_1.default)
            .post("/analysis/save")
            .send(mockReqData);
        expect(res.status).toBe(500);
        expect(res.body.error).toBe("Error saving analysis result");
        expect(res.body.detail).toBe("DB crashed");
    });
});
