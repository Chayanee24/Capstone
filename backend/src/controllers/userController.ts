import { Request, Response } from 'express'
import supabase from '../services/supabase'

// GET: /users
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase.from('Users').select('*')
  if (error) {
    res.status(400).json({ error: error.message })
    return
  }
  res.json({ data })
}

// POST: /users
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body
  const { data, error } = await supabase.from('users').insert([{ name, email, password, role }])
  if (error) {
    res.status(400).json({ error: error.message })
    return
  }
  res.status(201).json({ message: 'User created', data })
}

// PUT: /users/:id
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { name, email } = req.body
  const { data, error } = await supabase
    .from('users')
    .update({ name, email })
    .eq('id', id)
  if (error) {
    res.status(400).json({ error: error.message })
    return
  }
  res.json({ message: `User ${id} updated`, data })
}

// DELETE: /users/:id
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { error } = await supabase.from('Users').delete().eq('id', id)
  if (error) {
    res.status(400).json({ error: error.message })
    return
  }
  res.json({ message: `User ${id} deleted` })
}
