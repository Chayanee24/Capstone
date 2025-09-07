"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diseaseController_1 = require("../controllers/diseaseController");
const router = express_1.default.Router();
router.get('/', diseaseController_1.getDiseaseInformations);
router.get('/all', diseaseController_1.getInformationAll);
exports.default = router;
