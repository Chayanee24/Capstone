import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Leaf } from "phosphor-react";

interface Roles {
  id: number;
  created_at: string;
  role_name: string;
}

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role_id: "",
  });
  const [roles, setRoles] = useState<Roles[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data.data))
      .catch((err) => console.error("error fetching roles:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/users/register", formData);
      if (res.status === 200 || res.status === 201) {
        alert("สมัครสมาชิกสำเร็จ!");
        navigate("/"); // ไปหน้า Login
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-green-900 to-black px-4">
      <div className="w-full max-w-md bg-black/80 p-8 rounded-2xl shadow-2xl text-white">
        
        {/* Logo */}
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

        {error && <p className="text-red-400 text-center mb-3">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-semibold">ชื่อผู้ใช้</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="กรอกชื่อผู้ใช้"
              required
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">อีเมล</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="กรอกอีเมล"
              required
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">เบอร์โทรศัพท์</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="กรอกเบอร์โทรศัพท์"
              required
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่าน"
              required
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">คุณเป็นใคร</label>
            <select
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
            >
              <option value="">-- เลือกบทบาท --</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.role_name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-4 bg-green-600 hover:bg-green-500 rounded-lg font-semibold transition-colors"
          >
            {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-zinc-400">
          มีบัญชีแล้ว ?{" "}
          <Link to="/" className="text-green-400 hover:underline">
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;