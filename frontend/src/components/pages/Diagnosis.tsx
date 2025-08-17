import { useState } from "react"
import { Slide, Zoom } from "react-awesome-reveal"

interface Disease {
  disease_name: string;
  symptom: string;
  solution_text: string;
}

interface DiagnosisResult {
  diseaseName: string
  prediction: string
  cause?: string
  treatment?: string
}

const Diagnosis = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)
      setPreview(URL.createObjectURL(file))
      setResult(null)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setPreview(null)
    setResult(null)
  }

  const analyzeImage = async () => {
    if (!selectedImage) return
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("image", selectedImage)

      const analyzeResponse = await fetch("http://localhost:3000/uploads/analyze", {
        method: "POST",
        body: formData,
      })
      if (!analyzeResponse.ok) throw new Error("ไม่สามารถวิเคราะห์ได้")

      const analyzeData: { prediction: string } = await analyzeResponse.json()

      const allResponse = await fetch("http://localhost:3000/disease/all")
      if (!allResponse.ok) throw new Error("ไม่สามารถโหลดข้อมูลโรคได้")

      const allData: Disease[] = await allResponse.json()
      const disease = allData.find((d) => d.disease_name === analyzeData.prediction)
      if (!disease) throw new Error("ไม่พบข้อมูลโรค")

      setResult({
        diseaseName: disease.disease_name,
        prediction: analyzeData.prediction,
        cause: disease.symptom,
        treatment: disease.solution_text,
      })
    } catch (err: any) {
      alert(err.message || "เกิดข้อผิดพลาด")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white p-6 flex flex-col items-center">
      <Zoom>
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4">
          วินิจฉัยโรคข้าว 🌾
        </h1>
      </Zoom>

      <Slide direction="up">
        <p className="mb-6 text-center text-zinc-300 max-w-2xl">
          ถ่ายรูปใบข้าวหรือเลือกจากคลังรูปเพื่อตรวจสอบอาการ
          ระบบจะแสดงผล prediction พร้อมรายละเอียดสาเหตุและการดูแลรักษา
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
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>

        <button
          onClick={analyzeImage}
          disabled={!selectedImage || loading}
          className="bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
        >
          {loading ? "กำลังวิเคราะห์..." : "วิเคราะห์"}
        </button>
      </div>

      <div className="w-full flex justify-center mb-6">
        {preview ? (
          <div className="relative">
            <img src={preview} alt="preview" className="w-60 h-60 object-cover rounded-lg shadow-lg" />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-lg"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="w-full h-64 flex items-center justify-center border-2 border-dashed border-green-400 rounded-lg">
            <span className="text-green-400">ยังไม่มีรูป</span>
          </div>
        )}
      </div>

      {result && (
        <div className="w-full max-w-3xl flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-green-400 mb-4">ผลลัพธ์วินิจฉัย</h2>
          <Slide direction="up">
            <div className="bg-zinc-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <p><strong>Prediction:</strong> {result.prediction}</p>
              <p><strong>โรค:</strong> {result.diseaseName}</p>
              <p><strong>สาเหตุ:</strong> {result.cause}</p>
              <p><strong>การดูแลรักษา:</strong> {result.treatment}</p>
            </div>
          </Slide>
        </div>
      )}
    </div>
  )
}

export default Diagnosis
