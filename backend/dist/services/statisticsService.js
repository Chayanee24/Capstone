"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStatisticsService = exports.updateDiseaseStatisticService = void 0;
//statisticsService.ts
const supabase_1 = __importDefault(require("./supabase"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const updateDiseaseStatisticService = async (diseaseName, latitude, longitude) => {
    var _a, _b;
    if (!diseaseName || !latitude || !longitude) {
        throw new Error("Missing required fields");
    }
    const currentYear = new Date().getFullYear();
    // 📌 province จาก Nominatim
    const geoResponse = await (0, node_fetch_1.default)(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=7&addressdetails=1`, { headers: { "User-Agent": "my-app" } });
    const geoData = (await geoResponse.json());
    // ✅ ใช้ state เป็นหลัก (คือจังหวัด)
    let province = ((_a = geoData.address) === null || _a === void 0 ? void 0 : _a.province) || ((_b = geoData.address) === null || _b === void 0 ? void 0 : _b.city) || "Unknown";
    if (province.startsWith("จังหวัด")) {
        province = province.replace("จังหวัด", "").trim();
    }
    // 📌 หา disease_id
    const { data: disease, error: diseaseError } = await supabase_1.default
        .from("DiseaseInformations")
        .select("id")
        .eq("disease_name", diseaseName)
        .single();
    if (diseaseError || !disease)
        throw new Error("Disease not found");
    // 📌 หา province_id
    const { data: provinceRow, error: provinceError } = await supabase_1.default
        .from("Provinces")
        .select("id")
        .eq("province_name", province)
        .single();
    if (provinceError || !provinceRow)
        throw new Error("Province not found");
    const disease_id = disease.id;
    const province_id = provinceRow.id;
    // 📌 เช็คว่ามีข้อมูลของปีนี้อยู่แล้วหรือยัง
    const { data: stat } = await supabase_1.default
        .from("DiseaseStatistics")
        .select("id, total_case")
        .eq("disease_id", disease_id)
        .eq("province_id", province_id)
        .eq("year", currentYear)
        .maybeSingle();
    if (stat) {
        // ✅ update
        const { data, error } = await supabase_1.default
            .from("DiseaseStatistics")
            .update({
            total_case: stat.total_case + 1,
            updated_at: new Date(),
        })
            .eq("id", stat.id)
            .select();
        if (error)
            throw new Error(error.message);
        return { message: "Statistic updated successfully", data };
    }
    else {
        // ✅ insert
        const { data, error } = await supabase_1.default
            .from("DiseaseStatistics")
            .insert({
            disease_id,
            province_id,
            year: currentYear,
            total_case: 1,
            updated_at: new Date(),
        })
            .select();
        if (error)
            throw new Error(error.message);
        return { message: "Statistic inserted successfully", data };
    }
};
exports.updateDiseaseStatisticService = updateDiseaseStatisticService;
const getAllStatisticsService = async () => {
    const { data, error } = await supabase_1.default
        .from("DiseaseStatistics")
        .select(`
    id,
    total_case,
    year,
    updated_at,
    DiseaseInformations (
      id,
      disease_name,
      AnalysisResults (
        id,
        predicted_deficiency,
        RiceImages (
          id,
          image_path,
          latitude,
          longitude,
          created_at
        )
      )
    ),
    Provinces (
      id,
      province_name,
      Region (
        id,
        region_name
      )
    )
  `)
        .order("year", { ascending: false })
        .order("updated_at", { ascending: false });
    if (error)
        throw new Error(error.message);
    return data;
};
exports.getAllStatisticsService = getAllStatisticsService;
