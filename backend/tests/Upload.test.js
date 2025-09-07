"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Upload.test.ts
jest.mock("../src/services/supabase", () => ({
    __esModule: true,
    default: {
        storage: { from: jest.fn() },
        from: jest.fn(),
    },
}));
jest.mock("axios");
jest.mock("../src/controllers/analysisController", () => ({
    saveAnalysisResult: jest.fn((req, res) => {
        res.status(200).json({
            filePath: "testrice.jpg",
            analysis: { label: res.locals.analysisData.prediction },
        });
    }),
}));
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../src/index")); // ต้อง import หลัง mock
const supabase_1 = __importDefault(require("../src/services/supabase"));
const axios_1 = __importDefault(require("axios"));
describe("Upload Rice Images", () => {
    const testImagePath = path_1.default.resolve(__dirname, "assets/testrice.jpg");
    afterEach(() => {
        jest.clearAllMocks(); // เคลียร์ mock หลังแต่ละ test
    });
    it("อัปโหลดสำเร็จ", async () => {
        supabase_1.default.storage.from.mockImplementation(() => ({
            upload: jest.fn().mockResolvedValue({
                data: { path: "testrice.jpg" },
                error: null,
            }),
            getPublicUrl: jest.fn().mockReturnValue({
                data: { publicUrl: "http://fake.url/img.jpg" },
            }),
        }));
        supabase_1.default.from.mockReturnValue({
            insert: jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue({
                    data: [{ id: 1 }],
                    error: null,
                }),
            }),
        });
        axios_1.default.post.mockResolvedValue({
            data: { label: "ใบข้าวสมบูรณ์" },
        });
        const res = await (0, supertest_1.default)(index_1.default)
            .post("/uploads/analyze")
            .attach("image", testImagePath);
        expect(res.status).toBe(200);
        expect(res.body.filePath).toBeDefined();
        expect(res.body.analysis.label).toBe("ใบข้าวสมบูรณ์");
    });
    it("อัปโหลดล้มเหลว", async () => {
        supabase_1.default.storage.from.mockImplementation(() => ({
            upload: jest.fn().mockResolvedValue({
                data: null,
                error: { message: "Upload failed" },
            }),
        }));
        const res = await (0, supertest_1.default)(index_1.default)
            .post("/uploads/analyze")
            .attach("image", testImagePath);
        expect(res.status).toBe(500);
        expect(res.body.error).toBe("Upload failed");
    });
});
