import { useState } from "react";
import { Slide, Zoom } from "react-awesome-reveal";

interface DiagnosisResult {
  fileName: string;
  diseaseName: string;
  cause?: string;
  treatment?: string;
}

const Diagnosis = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [results, setResults] = useState<DiagnosisResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...filesArray]);
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setResults((prev) => prev.filter((_, i) => i !== index));
  };

  const analyzeImages = async () => {
    if (selectedImages.length === 0) return;
    setLoading(true);

    try {
      const formData = new FormData();
      selectedImages.forEach((file) => formData.append("images", file));

      const analyzeResponse = await fetch("https://your-backend.com/api/analyze", {
        method: "POST",
        body: formData,
      });

      const analyzeData: { fileName: string; diseaseName: string }[] =
        await analyzeResponse.json();

      const detailedResults: DiagnosisResult[] = await Promise.all(
        analyzeData.map(async (item) => {
          const detailResponse = await fetch(
            `https://your-backend.com/api/disease/${encodeURIComponent(item.diseaseName)}`
          );
          const detailData: { cause: string; treatment: string } =
            await detailResponse.json();

          return {
            ...item,
            cause: detailData.cause,
            treatment: detailData.treatment,
          };
        })
      );

      setResults(detailedResults);
    } catch (error) {
      console.error("Error analyzing images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white p-6 flex flex-col items-center">
      <Zoom>
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4">
          วินิจฉัยโรคข้าว 🌾
        </h1>
      </Zoom>
      <Slide direction="up">
        <p className="mb-6 text-center text-zinc-300 max-w-2xl">
          ถ่ายรูปใบข้าวหรือเลือกจากคลังรูปเพื่อตรวจสอบอาการ ระบบจะวิเคราะห์โรคเบื้องต้นและแสดงรายละเอียดสาเหตุพร้อมวิธีดูแลรักษา
        </p>
      </Slide>

      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <label className="cursor-pointer bg-green-400 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition-colors">
          ถ่ายรูป
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        <label className="cursor-pointer bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors">
          เลือกรูปจากคลัง
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        <button
          onClick={analyzeImages}
          disabled={selectedImages.length === 0 || loading}
          className="bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
        >
          {loading ? "กำลังวิเคราะห์..." : "วิเคราะห์"}
        </button>
      </div>

      <div className="w-full flex flex-wrap gap-4 justify-center mb-6">
        {previews.length > 0 ? (
          previews.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`preview-${index}`}
                className="w-40 h-40 object-cover rounded-lg shadow-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <div className="w-full h-64 flex items-center justify-center border-2 border-dashed border-green-400 rounded-lg">
            <span className="text-green-400">ยังไม่มีรูป</span>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="w-full max-w-3xl flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            ผลลัพธ์วินิจฉัยเบื้องต้น
          </h2>
          {results.map((res, i) => (
            <Slide key={i} direction="up">
              <div className="bg-zinc-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <p>
                  <strong>ไฟล์:</strong> {res.fileName}
                </p>
                <p>
                  <strong>โรค:</strong> {res.diseaseName}
                </p>
                <p>
                  <strong>สาเหตุ:</strong> {res.cause}
                </p>
                <p>
                  <strong>การดูแลรักษา:</strong> {res.treatment}
                </p>
              </div>
            </Slide>
          ))}
        </div>
      )}
    </div>
  );
};

export default Diagnosis;
