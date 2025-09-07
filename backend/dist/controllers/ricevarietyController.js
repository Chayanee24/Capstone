"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRicevariety = void 0;
const supabase_1 = __importDefault(require("../services/supabase"));
// GET: /Ricevariety
const getRicevariety = async (_req, res) => {
    const { data, error } = await supabase_1.default.from('RiceVariety').select('*, Morphology(characteristic), Strengths(strength), Weaknesses(weaknesse)');
    if (error) {
        res.status(400).json({ error: error.message });
        return;
    }
    res.json({ data });
};
exports.getRicevariety = getRicevariety;
