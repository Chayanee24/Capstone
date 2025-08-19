import { Request, Response } from "express"
import { updateDiseaseStatisticService, getAllStatisticsService } from "../services/statisticsService"

export const updateDiseaseStatistic = async (req: Request, res: Response) => {
  try {
    const { diseaseName, latitude, longitude } = req.body
    const result = await updateDiseaseStatisticService(diseaseName, latitude, longitude)
    res.json(result)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export const getStatisticsAll = async (_req: Request, res: Response) => {
  try {
    const data = await getAllStatisticsService()
    res.json({ data })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}
