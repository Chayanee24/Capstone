import { useEffect, useMemo, useState } from "react";
import { Slide } from "react-awesome-reveal";
import { API_URL } from "../../config/api";

interface SolutionItem {
  solution_text: string;
}

interface DiseaseInfo {
  disease_name: string;
  symptom: string;
  DeficiencySolutions?: SolutionItem[];
}

const API_ALL = `${API_URL}/disease/all`;

const normalizeThai = (s: string) =>
  s?.normalize("NFC").replace(/\s+/g, " ").trim();

const DiseasePage = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<DiseaseInfo | null>(null);
  const [allDiseases, setAllDiseases] = useState<DiseaseInfo[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  // โหลดข้อมูลโรคทั้งหมด
  useEffect(() => {
    const fetchAll = async () => {
      setLoadingList(true);
      setError("");
      try {
        const res = await fetch(`${API_ALL}?_=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) throw new Error("โหลดรายชื่อโรคไม่สำเร็จ");
        const data = await res.json();
        const list: unknown = Array.isArray(data) ? data : data?.data ?? [];
        if (!Array.isArray(list)) throw new Error("รูปแบบข้อมูลจากเซิร์ฟเวอร์ไม่ถูกต้อง");
        setAllDiseases(list as DiseaseInfo[]);
      } catch (e: any) {
        console.error(e);
        setError(e.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล");
        setAllDiseases([]);
      } finally {
        setLoadingList(false);
      }
    };
    fetchAll();
  }, []);

  // Suggestion list
  const suggestions = useMemo(() => {
    const q = normalizeThai(query);
    if (!q) return [];
    return allDiseases
      .map((d) => d.disease_name)
      .filter((n) => normalizeThai(n)?.includes(q))
      .slice(0, 8);
  }, [query, allDiseases]);

  // ค้นหาโรค
  const searchDisease = () => {
    const q = normalizeThai(query);
    if (!q) return;
    setSearching(true);
    setError("");
    setResult(null);
    try {
      const exact = allDiseases.find((d) => normalizeThai(d.disease_name) === q);
      if (exact) {
        setResult(exact);
      } else {
        const partial = allDiseases.find((d) => normalizeThai(d.disease_name)?.includes(q));
        if (partial) setResult(partial);
        else setError("ไม่พบโรคที่ค้นหา");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "เกิดข้อผิดพลาด");
    } finally {
      setSearching(false);
      setShowSuggestions(false);
    }
  };

  const onPickSuggestion = (name: string) => {
    setQuery(name);
    const found = allDiseases.find((d) => d.disease_name === name);
    if (found) setResult(found);
    setError("");
    setShowSuggestions(false);
  };

  return (
    <div className="w-full min-h-screen bg-zinc-900 p-6 flex flex-col items-center">

      {/* แสดงส่วน search เฉพาะเมื่อยังไม่เลือกโรค */}
      {!result && (
        <>
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4 drop-shadow-lg">
            ค้นหาโรคข้าว 🎑
          </h1>
          <p className="text-green-100/70 mb-6 text-center max-w-2xl">
            พิมพ์ชื่อโรคข้าวหรือเลือกจากรายการ ระบบจะแสดงสาเหตุและวิธีการดูแลรักษา
          </p>
        </>
      )}

      {loadingList}

      {!result && (
        <div className="w-full max-w-md mb-6 relative">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="กรอกชื่อโรคข้าว"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setError("");
                setShowSuggestions(true);
              }}
              onKeyDown={(e) => { if (e.key === "Enter") searchDisease(); }}
              className="flex-1 p-3 rounded-lg text-green-900 placeholder-green-700 focus:outline-none"
            />
            <button
              onClick={searchDisease}
              disabled={searching || !query.trim()}
              className="bg-green-400 px-6 py-3 rounded-lg hover:bg-green-500 transition-all duration-300 shadow-md disabled:opacity-50"
            >
              {searching ? "กำลังค้นหา..." : "ค้นหา"}
            </button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute mt-2 left-0 right-0 bg-zinc-800 border border-green-700 rounded-lg max-h-56 overflow-y-auto z-10">
              {suggestions.map((name) => (
                <li
                  key={name}
                  className="p-2 hover:bg-green-700/60 cursor-pointer text-green-100"
                  onClick={() => onPickSuggestion(name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* แสดงผลลัพธ์ */}
      {result && (
        <Slide direction="up">
          <div className="bg-green-900/50 p-6 rounded-xl shadow-lg w-full max-w-md backdrop-blur-md border border-green-700">
            <h2 className="text-2xl font-bold text-green-300 mb-2 drop-shadow-md">
              {result.disease_name}
            </h2>

            <div className="mb-4 text-green-100/80">
              <strong className="block mb-1 font-bold text-yellow-200">สาเหตุ:</strong>
              <ul className="list-disc list-inside space-y-1">
                {result.symptom
                  ? result.symptom
                      .split(/(?=<u>)/)
                      .map((line, i) =>
                        line.trim() ? (
                          <li key={i}>{line.replace(/<[^>]+>/g, "").trim()}</li>
                        ) : null
                      )
                  : <li>- ไม่มีข้อมูล</li>}
              </ul>
            </div>

            <div className="text-green-100/80 mb-6">
              <strong className="block mb-1 font-bold text-yellow-200">การดูแลรักษา:</strong>
              <ul className="list-disc list-inside space-y-1">
                {result.DeficiencySolutions?.map((item, index) => (
                  <li key={index}>{item.solution_text}</li>
                )) || <li>- ไม่มีข้อมูล</li>}
              </ul>
            </div>

            {/* ปุ่มย้อนกลับล่างสุด */}
            <div className="mt-6">
              <button
                onClick={() => {
                  setResult(null);
                  setQuery("");
                  setShowSuggestions(true);
                }}
                className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
              >
                เสร็จสิ้น
              </button>
            </div>
          </div>
        </Slide>
      )}
    </div>
  );
};

export default DiseasePage;
