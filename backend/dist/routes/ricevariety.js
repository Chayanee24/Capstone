"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ricevarietyController_1 = require("../controllers/ricevarietyController");
//import {getDiseaseInformations, getInformationAll} from '../controllers/diseaseController'
const router = express_1.default.Router();
router.get('/', ricevarietyController_1.getRicevariety);
exports.default = router;
