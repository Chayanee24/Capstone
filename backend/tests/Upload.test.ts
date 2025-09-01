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

import request from "supertest";
import path from "path";
import app from "../src/index"; // ต้อง import หลัง mock
import supabase from "../src/services/supabase";
import axios from "axios";

describe("Upload Rice Images", () => {
  const testImagePath = path.resolve(__dirname, "assets/testrice.jpg");

  afterEach(() => {
    jest.clearAllMocks(); // เคลียร์ mock หลังแต่ละ test
  });

  it("อัปโหลดสำเร็จ", async () => {
    (supabase.storage.from as jest.Mock).mockImplementation(() => ({
      upload: jest.fn().mockResolvedValue({
        data: { path: "testrice.jpg" },
        error: null,
      }),
      getPublicUrl: jest.fn().mockReturnValue({
        data: { publicUrl: "http://fake.url/img.jpg" },
      }),
    }));

    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({
          data: [{ id: 1 }],
          error: null,
        }),
      }),
    });

    (axios.post as jest.Mock).mockResolvedValue({
      data: { label: "ใบข้าวสมบูรณ์" },
    });

    const res = await request(app)
      .post("/uploads/analyze")
      .attach("image", testImagePath);

    expect(res.status).toBe(200);
    expect(res.body.filePath).toBeDefined();
    expect(res.body.analysis.label).toBe("ใบข้าวสมบูรณ์");
  });

  it("อัปโหลดล้มเหลว", async () => {
    (supabase.storage.from as jest.Mock).mockImplementation(() => ({
      upload: jest.fn().mockResolvedValue({
        data: null,
        error: { message: "Upload failed" },
      }),
    }));

    const res = await request(app)
      .post("/uploads/analyze")
      .attach("image", testImagePath);

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Upload failed");
  });
});

