import { useState } from "react";
import { Slide, Zoom } from "react-awesome-reveal";

interface RiceVariety {
  name: string;
  region: string;
  features: string;
}

const VarietyPage = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<RiceVariety | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchVariety = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `https://your-backend.com/api/variety/${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("ไม่พบข้อมูลพันธุ์ข้าว");

      const data: RiceVariety = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white p-6 flex flex-col items-center">
      <Zoom>
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4">
          ค้นหาพันธุ์ข้าว 🌾
        </h1>
      </Zoom>
      <Slide direction="up">
        <p className="text-zinc-300 mb-6 text-center max-w-2xl">
          พิมพ์ชื่อพันธุ์ข้าวที่ต้องการค้นหา ระบบจะแสดงข้อมูลภูมิประเทศและลักษณะเด่นของพันธุ์นั้น
        </p>
      </Slide>

      {/* ช่องค้นหา */}
      <div className="flex w-full max-w-md gap-2 mb-6">
        <input
          type="text"
          placeholder="กรอกชื่อพันธุ์ข้าว..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-3 rounded-lg text-black focus:outline-none"
        />
        <button
          onClick={searchVariety}
          disabled={loading || !query.trim()}
          className="bg-green-400 px-6 py-3 rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50"
        >
          {loading ? "กำลังค้นหา..." : "ค้นหา"}
        </button>
      </div>

      {/* แสดงผลลัพธ์ */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {result && (
        <Slide direction="up">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">{result.name}</h2>
            <p className="mb-2"><strong>ภูมิประเทศ:</strong> {result.region}</p>
            <p><strong>ลักษณะเด่น:</strong> {result.features}</p>
          </div>
        </Slide>
      )}
    </div>
  );
};

export default VarietyPage;
