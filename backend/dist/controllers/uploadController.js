"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageAndAnalyze = void 0;
const axios_1 = __importDefault(require("axios"));
const supabase_1 = __importDefault(require("../services/supabase"));
const API_AI = process.env.API_AI;
const uploadImageAndAnalyze = async (req, res, next) => {
    var _a;
    try {
        const file = req.file;
        const { latitude, longitude, user_id } = req.body;
        if (!file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }
        const fileExt = file.originalname.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;
        // ✅ อัปโหลดไป storage
        const { error: uploadError } = await supabase_1.default.storage
            .from("up-loads")
            .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
        });
        if (uploadError) {
            res.status(500).json({ error: uploadError.message });
            return;
        }
        // ✅ public URL
        const { data } = supabase_1.default.storage.from("up-loads").getPublicUrl(filePath);
        const imageUrl = data.publicUrl;
        // ✅ เรียก AI วิเคราะห์
        const aiResponse = await axios_1.default.post(`${API_AI}/uploads/analyze`, {
            url: imageUrl,
        });
        // ✅ insert ลง RiceImages
        const { data: riceImageData, error: riceImageError } = await supabase_1.default
            .from("RiceImages")
            .insert([
            {
                image_path: imageUrl,
                latitude,
                longitude,
                user_id: user_id,
            },
        ])
            .select("id");
        if (riceImageError)
            throw new Error(riceImageError.message);
        const insertedId = (_a = riceImageData === null || riceImageData === void 0 ? void 0 : riceImageData[0]) === null || _a === void 0 ? void 0 : _a.id;
        res.locals.analysisData = {
            imageID: insertedId,
            prediction: aiResponse.data.label,
            imageUrl,
        };
        next();
    }
    catch (err) {
        res.status(500).json({ error: "Error processing request", detail: err.message });
    }
};
exports.uploadImageAndAnalyze = uploadImageAndAnalyze;
