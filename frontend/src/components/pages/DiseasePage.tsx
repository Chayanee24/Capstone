import { useState } from "react";
import { Slide, Zoom } from "react-awesome-reveal";

interface DiseaseInfo {
  name: string;
  cause: string;
  treatment: string;
}

const DiseasePage = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<DiseaseInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchDisease = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `https://your-backend.com/api/disease/${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("ไม่พบข้อมูลโรค");

      const data: DiseaseInfo = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-900 p-6 flex flex-col items-center">
      {/* หัวข้อ */}
      <Zoom>
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4 drop-shadow-lg">
          ค้นหาโรคข้าว 🌾
        </h1>
      </Zoom>

      {/* คำอธิบาย */}
      <Slide direction="up">
        <p className="text-green-100/70 mb-6 text-center max-w-2xl">
          พิมพ์ชื่อโรคข้าวที่ต้องการค้นหา ระบบจะแสดงสาเหตุและวิธีการดูแลรักษา
        </p>
      </Slide>

      {/* ช่องค้นหา */}
      <div className="flex w-full max-w-md gap-2 mb-6">
        <input
          type="text"
          placeholder="กรอกชื่อโรคข้าว..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-3 rounded-lg text-green-900 placeholder-green-700 focus:outline-none"
        />
        <button
          onClick={searchDisease}
          disabled={loading || !query.trim()}
          className="bg-green-400 px-6 py-3 rounded-lg hover:bg-green-500 transition-all duration-300 shadow-md disabled:opacity-50"
        >
          {loading ? "กำลังค้นหา..." : "ค้นหา"}
        </button>
      </div>

      {/* แสดงผลลัพธ์ */}
      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {result && (
        <Slide direction="up">
          <div className="bg-green-900/50 p-6 rounded-xl shadow-lg w-full max-w-md backdrop-blur-md border border-green-700">
            <h2 className="text-2xl font-bold text-green-300 mb-2 drop-shadow-md">{result.name}</h2>
            <p className="mb-2 text-green-100/80"><strong>สาเหตุ:</strong> {result.cause}</p>
            <p className="text-green-100/80"><strong>การดูแลรักษา:</strong> {result.treatment}</p>
          </div>
        </Slide>
      )}
    </div>
  );
};

export default DiseasePage;
