"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInformationAll = exports.getDiseaseInformations = void 0;
const supabase_1 = __importDefault(require("../services/supabase"));
// GET: /DiseaseInformation
const getDiseaseInformations = async (_req, res) => {
    const { data, error } = await supabase_1.default.from('DiseaseInformations').select('*');
    if (error) {
        res.status(400).json({ error: error.message });
        return;
    }
    res.json({ data });
};
exports.getDiseaseInformations = getDiseaseInformations;
const getInformationAll = async (_req, res) => {
    const { data, error } = await supabase_1.default
        .from('DiseaseInformations')
        .select('*, DeficiencySolutions(solution_text)');
    if (error) {
        res.status(400).json({ error: error.message });
        return;
    }
    res.json({ data });
};
exports.getInformationAll = getInformationAll;
