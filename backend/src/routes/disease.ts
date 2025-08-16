import express from 'express'
import {getDiseaseInformations, getInformationAll} from '../controllers/diseaseController'

const router = express.Router()

router.get('/', getDiseaseInformations)
router.get('/all', getInformationAll)

export default router;