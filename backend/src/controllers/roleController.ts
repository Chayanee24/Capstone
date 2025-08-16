import { Request, Response } from 'express'
import supabase from '../services/supabase'

// GET: /roles
export const getRoles = async (_req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase.from('Roles').select('*')
  if (error) {
    res.status(400).json({ error: error.message })
    return
  }
  res.json({ data })
}
