"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//route/upload.ts
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uploadController_1 = require("../controllers/uploadController");
const analysisController_1 = require("../controllers/analysisController");
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.post('/analyze', upload.single('image'), uploadController_1.uploadImageAndAnalyze, analysisController_1.saveAnalysisResult);
exports.default = router;
