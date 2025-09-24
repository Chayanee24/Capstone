import { Request, Response } from 'express'
import supabase from '../services/supabase'

// ✅ REGISTER
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  let { email, password, username, phone } = req.body

  email = email.trim().toLowerCase()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    phone,
    options: {
      data: {
        display_name: username,
        phone: phone
      }
    }
  })
  
  const authUserId = data.user?.id;

  if (error) {
    res.status(400).json({ error: error.message })
    return
  }

  // insert ลง public.Users
  await supabase
    .from('Users')
    .insert([{ user_id: authUserId, role_id: 1 }]);

  res.status(201).json({ message: 'User registered successfully', data })
}

// ✅ LOGIN
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  let { email, password } = req.body

  email = email.trim().toLowerCase()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    res.status(400).json({ error: error.message })
    return
  }

  res.json({
    success: true,
    token: data.session?.access_token,
    user: data.user,
  });
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    let { email } = req.params;

    email = email.trim().toLowerCase()

    // ดึง user จาก auth ทั้งหมด
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) {
      res.status(400).json({ error: authError.message });
      return;
    }

    // หา user ที่ตรงกับ email
    const user = authData.users.find((u) => u.email?.toLowerCase() === email);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // ดึง profile + role ที่เชื่อม
    const { data: profileData, error: profileError } = await supabase
      .from("Users")
      .select("*, Roles(*)") 
      .eq("user_id", user.id) 
      .single();

    if (profileError) {
      res.status(400).json({ error: profileError.message });
      return;
    }

    // รวมข้อมูล
    const result = {
      ...user,
      profile: profileData || null,
    };

    res.json({ data: result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};