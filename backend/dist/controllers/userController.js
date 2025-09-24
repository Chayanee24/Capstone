"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const supabase_1 = __importDefault(require("../services/supabase"));
// ✅ REGISTER
const registerUser = async (req, res) => {
    var _a;
    let { email, password, username, phone } = req.body;
    email = email.trim().toLowerCase();
    const { data, error } = await supabase_1.default.auth.signUp({
        email,
        password,
        phone,
        options: {
            data: {
                display_name: username,
                phone: phone
            }
        }
    });
    const authUserId = (_a = data.user) === null || _a === void 0 ? void 0 : _a.id;
    if (error) {
        res.status(400).json({ error: error.message });
        return;
    }
    // insert ลง public.Users
    await supabase_1.default
        .from('Users')
        .insert([{ user_id: authUserId, role_id: 1 }]);
    res.status(201).json({ message: 'User registered successfully', data });
};
exports.registerUser = registerUser;
// ✅ LOGIN
const loginUser = async (req, res) => {
    var _a;
    let { email, password } = req.body;
    email = email.trim().toLowerCase();
    const { data, error } = await supabase_1.default.auth.signInWithPassword({
        email,
        password
    });
    if (error) {
        res.status(400).json({ error: error.message });
        return;
    }
    res.json({
        success: true,
        token: (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token,
        user: data.user,
    });
};
exports.loginUser = loginUser;
const getUsers = async (req, res) => {
    try {
        let { email } = req.params;
        email = email.trim().toLowerCase();
        // ดึง user จาก auth ทั้งหมด
        const { data: authData, error: authError } = await supabase_1.default.auth.admin.listUsers();
        if (authError) {
            res.status(400).json({ error: authError.message });
            return;
        }
        // หา user ที่ตรงกับ email
        const user = authData.users.find((u) => { var _a; return ((_a = u.email) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === email; });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        // ดึง profile + role ที่เชื่อม
        const { data: profileData, error: profileError } = await supabase_1.default
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
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getUsers = getUsers;
