import { Request, Response } from 'express'
import supabase from '../services/supabase'

// ✅ REGISTER
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username, role, phone } = req.body

  // ใช้ auth.signup
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: username,
        phone: phone
      }
    }
  })  

  if (error) {
    res.status(400).json({ error: error.message })
    return
  }

  res.status(201).json({ message: 'User registered successfully', data })
}

// ✅ LOGIN
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  //console.log(email);
  //console.log(password);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    res.status(400).json({ error: error.message })
    //console.log(error);
    return
  }

  res.json({
    success: true,
    token: data.session?.access_token,
    user: data.user,
  });
}

// ✅ GET USERS (จากตาราง public.users ถ้ามี)
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase.from('users').select('*')
  if (error) {
    res.status(400).json({ error: error.message })
    return
  }
  res.json({ data })
}
