import request from "supertest";
import app from "../src/index";
import {
  updateDiseaseStatisticService,
  getAllStatisticsService,
} from "../src/services/statisticsService";
import supabase from "../src/services/supabase";

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
      (updateDiseaseStatisticService as jest.Mock).mockResolvedValue({
        success: true,
        diseaseName: "โรคใบขอบแห้ง",
      });

      const res = await request(app)
        .put("/Statistic")
        .send({
          diseaseName: "โรคใบขอบแห้ง",
          latitude: 15.0,
          longitude: 100.0,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.diseaseName).toBe("โรคใบขอบแห้ง");
      expect(updateDiseaseStatisticService).toHaveBeenCalledWith(
        "โรคใบขอบแห้ง",
        15.0,
        100.0
      );
    });

    it("อัปเดตสถิติไม่ได้", async () => {
      (updateDiseaseStatisticService as jest.Mock).mockRejectedValue(
        new Error("DB error")
      );

      const res = await request(app).put("/Statistic").send({
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
      (getAllStatisticsService as jest.Mock).mockResolvedValue([
        { diseaseName: "โรคใบขอบแห้ง", count: 10 },
        { diseaseName: "โรคไหม้", count: 5 },
      ]);

      const res = await request(app).get("/Statistic");

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.data[0].diseaseName).toBe("โรคใบขอบแห้ง");
      expect(getAllStatisticsService).toHaveBeenCalled();
    });

    it("ดึงข้อมูลสถิติไม่ได้", async () => {
      (getAllStatisticsService as jest.Mock).mockRejectedValue(
        new Error("Service unavailable")
      );

      const res = await request(app).get("/Statistic");

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Service unavailable");
    });
  });
});
