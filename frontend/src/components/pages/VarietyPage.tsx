// src/pages/VarietyPage.tsx
import { useEffect, useState } from "react";
import { Slide } from "react-awesome-reveal";
import { API_URL } from "../../config/api";

interface Morphology {
  characteristic: string;
}
interface Strength {
  strength: string;
}
interface Weakness {
  weaknesse: string;
}

interface RiceVariety {
  id: number;
  name_th: string;
  name_en: string;
  type: string;
  recommended_area: string;
  average_yield: string;
  Morphology: Morphology[];
  Strengths: Strength[];
  Weaknesses: Weakness[];
}

const varietyImages: Record<string, string> = {
  "กข1": "/images/varieties/กข1.JPG",
  "กข3": "/images/varieties/กข3.JPG",
  "กข7": "/images/varieties/กข7.JPG",
  "กข9": "/images/varieties/กข9.JPG",
  "กข11": "/images/varieties/กข11.JPG",
  "กข13": "/images/varieties/กข13.JPG",
  "กข21": "/images/varieties/กข21.JPG",
  "กข23": "/images/varieties/กข23.JPG",
  "แก่นจันทร์": "/images/varieties/แก่นจันทร์.JPG",
  "สุพรรณบุรี 1": "/images/varieties/สุพรรณบุรี1.JPG",
  "สุพรรณบุรี 2": "/images/varieties/สุพรรณบุรี2.JPG",
  "สุพรรณบุรี 60": "/images/varieties/สุพรรณบุรี60.JPG",
  "สุพรรณบุรี 90": "/images/varieties/สุพรรณบุรี90.JPG",
  "หางยี 71": "/images/varieties/หางยี71.JPG"
};

const VarietyPage = () => {
  const [varieties, setVarieties] = useState<RiceVariety[]>([]);
  const [selected, setSelected] = useState<RiceVariety | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVarieties = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/RiceVariety`);
        if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
        const json = await res.json();
        setVarieties(json.data);
      } catch (err: any) {
        setError(err.message || "เกิดข้อผิดพลาด");
      } finally {
        setLoading(false);
      }
    };
    fetchVarieties();
  }, []);

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white p-6 flex flex-col items-center">
      {!selected && (
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4">
          แนะนำพันธุ์ข้าว 🌾
        </h1>
      )}
      {!selected && (
        <p className="mb-6 text-center text-zinc-300 max-w-2xl">
          คลิกชื่อพันธุ์ข้าวเพื่อดูรายละเอียด
        </p>
      )}
      {/* Loading & Error */}
      {loading}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* รายการพันธุ์ข้าว (ซ่อนเมื่อมี selected) */}
      {!selected && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md sm:max-w-lg md:max-w-2xl">
          {varieties.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="w-full bg-green-400 text-black py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors"
            >
              {item.name_th}
            </button>
          ))}
        </div>
      )}

      {/* แสดงรายละเอียดพันธุ์ข้าว */}
      {selected && (
        <Slide direction="up">
          <div className="bg-green-900/50 p-6 rounded-xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl backdrop-blur-md border border-green-700">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-300 mb-4 drop-shadow-md text-center">
              {selected.name_th}
            </h2>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-green-200 mb-4 drop-shadow-md text-center">
              ({selected.name_en})
            </h2>
            {varietyImages[selected.name_th] && (
              <div className="mb-4 flex justify-center">
                <img
                  src={varietyImages[selected.name_th]}
                  alt={selected.name_th}
                  className="rounded-lg shadow-md max-h-64 object-cover"
                />
              </div>
            )}

            <p className="mb-2"><strong>ประเภท :</strong> {selected.type}</p>
            <p className="mb-2"><strong>ภูมิภาคแนะนำ :</strong> {selected.recommended_area}</p>
            <p className="mb-4"><strong>ผลผลิตเฉลี่ย :</strong> {selected.average_yield}</p>

            <div className="mb-4">
              <strong className="block mb-1 font-bold text-yellow-200">ลักษณะทางสัณฐาน :</strong>
              <ul className="list-disc list-inside text-green-100/80 space-y-1">
                {selected.Morphology.map((m, idx) => (
                  <li key={idx}>{m.characteristic}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <strong className="block mb-1 font-bold text-green-400">จุดเด่น :</strong>
              <ul className="list-disc list-inside text-green-100/80 space-y-1">
                {selected.Strengths.map((s, idx) => (
                  <li key={idx}>{s.strength}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <strong className="block mb-1 font-bold text-red-400">ข้อจำกัด :</strong>
              <ul className="list-disc list-inside text-green-100/80 space-y-1">
                {selected.Weaknesses.map((w, idx) => (
                  <li key={idx}>{w.weaknesse}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setSelected(null)}
                className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
              >
                กลับ
              </button>
            </div>
          </div>
        </Slide>
      )}

    </div>
  );
};

export default VarietyPage;
