"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAnalysisResult = void 0;
const supabase_1 = __importDefault(require("../services/supabase"));
const statisticsService_1 = require("../services/statisticsService");
const saveAnalysisResult = async (req, res) => {
    try {
        const { imageID, prediction, imageUrl } = res.locals.analysisData;
        // 📌 หา disease id
        const { data: diseaseData, error: diseaseError } = await supabase_1.default
            .from("DiseaseInformations")
            .select("id")
            .eq("disease_name", prediction)
            .single();
        if (diseaseError || !diseaseData) {
            res.status(500).json({ error: "Disease not found" });
            return;
        }
        const diseaseId = diseaseData.id;
        //console.log(diseaseId)
        //console.log(imageID)
        //console.log(prediction)
        // 📌 บันทึกผลการวิเคราะห์
        await supabase_1.default.from("AnalysisResults").insert([
            {
                disease_id: diseaseId || null,
                image_id: imageID || null,
                predicted_deficiency: prediction || null,
            },
        ]);
        // 📌 ดึง lat/long จาก RiceImages
        const { data: riceImage } = await supabase_1.default
            .from("RiceImages")
            .select("latitude, longitude")
            .eq("id", imageID)
            .single();
        let statisticResult = null;
        if (riceImage) {
            //console.log(riceImage.latitude)
            //console.log(riceImage.longitude)
            statisticResult = await (0, statisticsService_1.updateDiseaseStatisticService)(prediction, riceImage.latitude, riceImage.longitude);
        }
        res.json({
            message: "Upload + Analysis + Save successful",
            imageUrl,
            prediction,
            diseaseId,
            statisticResult,
            latitude: riceImage === null || riceImage === void 0 ? void 0 : riceImage.latitude,
            longitude: riceImage === null || riceImage === void 0 ? void 0 : riceImage.longitude
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Error saving analysis result",
            detail: error.message,
        });
    }
};
exports.saveAnalysisResult = saveAnalysisResult;
