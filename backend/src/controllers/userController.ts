import { Request, Response } from 'express'
import supabase from '../services/supabase'

// ✅ REGISTER
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username, role_id, phone } = req.body
  //console.log(role_id)
  // ใช้ auth.signup
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

  //insert ลง public.Users
  await supabase
    .from('Users')
    .insert([{ user_id: authUserId, role_id: role_id }]);

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

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;

    // ดึง user จาก auth ด้วย email
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) {
      res.status(400).json({ error: authError.message });
      return;
    }

    // หา user ที่ตรงกับ email
    const user = authData.users.find((u) => u.email === email);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // ดึง profile + role ที่เชื่อม
    const { data: profileData, error: profileError } = await supabase
      .from("Users")
      .select("*, Roles(*)") // join role
      .eq("user_id", user.id) // ใช้ uid เชื่อมกับ auth
      .single();

    if (profileError) {
      res.status(400).json({ error: profileError.message });
      return;
    }

    // รวมข้อมูล
    const result = {
      ...user,
      profile: profileData || null,
      //role: profileData?.Roles || null,
    };

    res.json({ data: result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};





