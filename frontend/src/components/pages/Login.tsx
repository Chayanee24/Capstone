import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Leaf } from "phosphor-react";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        setError(res.data.message || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch{
      setError("Please check your email and password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-green-900 to-black px-4">
      <div className="w-full max-w-md bg-black/80 p-8 rounded-2xl shadow-2xl text-white">
        
        {/* Logo */}
        <div className="flex justify-center items-center mb-6">
          <Leaf size={28} weight="fill" className="text-green-400 mr-2" />
          <h1 className="text-3xl font-extrabold">
            <span className="text-white">Khao</span>
            <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent ml-1">Care</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-600 text-white text-sm p-2 rounded-lg">
              {error}
            </div>
          )}

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
                type={showPassword ? "text" : "password"}   // 👈 toggle ตรงนี้
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรอกรหัสผ่าน"
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none pr-10"
                required
            />

            {/* ปุ่ม toggle 👁️ */}
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
            className="w-full py-2 mt-4 bg-green-600 hover:bg-green-500 rounded-lg font-semibold transition-colors"
          >
            เข้าสู่ระบบ
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
