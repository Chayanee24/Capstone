//Routes/statistics.ts
import express from 'express'
import { getStatisticsAll, updateDiseaseStatistic } from '../controllers/statisticsController'

const router = express.Router()

router.put('/', updateDiseaseStatistic)
router.get('/', getStatisticsAll)

export default router;