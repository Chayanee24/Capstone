import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Leaf } from "phosphor-react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/users/login", { email, password });

      if (res.data.success) {
        localStorage.setItem("email", email);

        // ดึงข้อมูล user หลัง login
        const roleRes = await axios.get(`http://localhost:3000/users/${email}`);
        const profile = roleRes.data?.data?.profile;
        const roleName = profile?.Roles?.role_name || "user"; // default role
        const displayName = roleRes.data?.data?.user_metadata?.display_name || email;

        const loggedUser = { email, role_name: roleName, display_name: displayName };
        setUser(loggedUser);

        console.log("Logged in user:", loggedUser);

        navigate("/home"); // redirect ไปหน้า home ทันที
      } else {
        setError(res.data.message || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("กรุณาตรวจสอบอีเมลและรหัสผ่าน");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-green-900 to-black px-4">
      <div className="w-full max-w-md bg-black/80 p-8 rounded-2xl shadow-2xl text-white">
        <div className="w-full flex justify-center items-center py-6 px-6 lg:px-16">
          <div className="font-extrabold flex items-center relative md:text-2xl text-lg">
            <span className="text-green-400 absolute -top-3 md:left-5 left-3">
              <Leaf size={25} weight="fill" />
            </span>
            <span className="text-white">Khao</span>
            <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
              Care
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-600 text-white text-sm p-2 rounded-lg">{error}</div>}

          <div>
            <label className="block mb-1 text-sm font-semibold">อีเมล</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="กรอกอีเมล"
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <label className="block mb-1 text-sm font-semibold">รหัสผ่าน</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรอกรหัสผ่าน"
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-zinc-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 rounded-lg font-semibold transition-colors ${
              loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-zinc-400">
          ยังไม่มีบัญชี ?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
