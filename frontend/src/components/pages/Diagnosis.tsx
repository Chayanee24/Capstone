import { useState } from "react"
import { Slide, Zoom } from "react-awesome-reveal"

interface Disease {
  disease_name: string
  symptom: string
  DeficiencySolutions: { solution_text: string }[]
}

interface DiagnosisResult {
  diseaseName: string
  prediction: string
  cause?: string
  treatment?: string[]
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

      // ดึงตำแหน่งปัจจุบันด้วย Geolocation API
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      )

      const { latitude, longitude } = position.coords
      const userId = localStorage.getItem("id");

      const formData = new FormData()
      formData.append("image", selectedImage)
      formData.append("latitude", latitude.toString())
      formData.append("longitude", longitude.toString())
      formData.append("user_id", userId ?? "")

      // เรียก API วิเคราะห์ภาพ
      const analyzeResponse = await fetch("http://localhost:3000/uploads/analyze", {
        method: "POST",
        body: formData,
      })

      console.log(analyzeResponse)
      
      if (!analyzeResponse.ok) throw new Error("ไม่สามารถวิเคราะห์ได้")
      const analyzeData: { prediction: string } = await analyzeResponse.json()

      // โหลดข้อมูลโรคทั้งหมด
      const allResponse = await fetch("http://localhost:3000/disease/all")
      if (!allResponse.ok) throw new Error("ไม่สามารถโหลดข้อมูลโรคได้")
      const allDataRaw = await allResponse.json()

      const allData: Disease[] = Array.isArray(allDataRaw)
        ? allDataRaw
        : Array.isArray(allDataRaw.data)
        ? allDataRaw.data
        : []

      console.log("Prediction:", analyzeData)
      console.log("All diseases:", allData.map(d => d.disease_name))

      const disease = allData.find((d) => d.disease_name === analyzeData.prediction)
      if (!disease) throw new Error("ไม่พบข้อมูลโรค")

      setResult({
        diseaseName: disease.disease_name,
        prediction: analyzeData.prediction,
        cause: disease.symptom,
        treatment: disease.DeficiencySolutions?.map((s) => s.solution_text) ?? [],
      })
    } catch (err: any) {
      alert(err.message || "เกิดข้อผิดพลาด")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ฟังก์ชันช่วยแยกบรรทัดและลบ <u>
  const formatSymptom = (text?: string) => {
    if (!text) return ["- ไม่มีข้อมูล"]
    return text
      .replace(/<u>/g, "")
      .replace(/<\/u>/g, "")
      .split(/(?:\r?\n|;|\.|\s{2,})/) // แยกบรรทัดตาม newline หรือจุดหรือเว้นวรรคมากกว่า 1
      .map((line) => line.trim())
      .filter(Boolean)
  }

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white p-6 flex flex-col items-center">
      <Zoom>
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4">
          วินิจฉัยโรคข้าว 🔍
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
        
        <Slide direction="up">
          <p className="text-green-200 font-extrabold text-3xl md:text-4xl mb-5 underline ">
                ผลการวินิจฉัย
            </p>
          <div className="bg-green-900/50 p-6 rounded-xl shadow-lg w-full max-w-md backdrop-blur-md border border-green-700 ">

            <h2 className="text-2xl font-bold text-green-300 mb-2 drop-shadow-md">
              {result.diseaseName}
            </h2>

            {/* สาเหตุ */}
            <div className="mb-4 text-green-100/80">
              <strong className="block mb-1 font-bold text-yellow-200">สาเหตุ:</strong>
              <ul className="list-disc list-inside space-y-1">
                {result.cause
                  ? result.cause
                    .split(/(?=<u>)/) // แยกทุก <u> เป็นบรรทัด
                    .map((line, i) =>
                      line.trim() ? (
                        <li key={i}>{line.replace(/<[^>]+>/g, "").trim()}</li>
                      ) : null
                    )
                  : <li>- ไม่มีข้อมูล</li>}
              </ul>
            </div>

            {/* การดูแลรักษา */}
            <div className="text-green-100/80">
              <strong className="block mb-1 font-bold text-yellow-200">การดูแลรักษา:</strong>
              <ul className="list-disc list-inside space-y-1">
                {result.treatment?.length
                  ? result.treatment.map((text, i) => <li key={i}>{text}</li>)
                : <li>- ไม่มีข้อมูล</li>}
              </ul>
            </div>
          
          </div>
        </Slide>
      )}
    </div>
  )
}

export default Diagnosis