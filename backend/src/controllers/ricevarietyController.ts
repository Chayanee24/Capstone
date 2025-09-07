import { Request, Response } from 'express'
import supabase from '../services/supabase'

// GET: /Ricevariety
export const getRicevariety = async (_req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase.from('RiceVariety').select('*, Morphology(characteristic), Strengths(strength), Weaknesses(weaknesse)')
  if (error) {
    res.status(400).json({ error: error.message })
    return
  }
  res.json({ data })
}