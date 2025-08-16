import { Request, Response } from 'express'
import supabase from '../services/supabase'

// GET: /DiseaseInformation
export const getDiseaseInformations = async (_req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase.from('DiseaseInformations').select('*')
  if (error) {
    res.status(400).json({ error: error.message })
    return
  }
  res.json({ data })
}

export const getInformationAll = async (_req: Request, res: Response): Promise<void> => { 
  const { data, error } = await supabase
    .from('DiseaseInformations')
    .select('*, DeficiencySolutions(solution_text)')

  if (error) {
    res.status(400).json({ error: error.message })
    return
  }

  res.json({ data })
}
