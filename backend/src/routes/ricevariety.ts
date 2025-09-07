import express from 'express'
import { getRicevariety } from '../controllers/ricevarietyController';
//import {getDiseaseInformations, getInformationAll} from '../controllers/diseaseController'

const router = express.Router()

router.get('/', getRicevariety)

export default router;