import { useEffect, useState } from "react"

interface Disease {
  id: string
  name: string
  cause: string
  treatment: string
  image: string
}

const DiseaseBlog = () => {
  const [disease, setDisease] = useState<Disease | null>(null)

  // ตัวอย่าง: fetch จาก backend API
  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/disease/1") // แก้ endpoint ตามจริง
        const data = await res.json()
        setDisease(data)
      } catch (err) {
        console.error("Error fetching disease:", err)
      }
    }

    fetchDisease()
  }, [])

  if (!disease) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-green-500">
        กำลังโหลดข้อมูล...
      </div>
    )
  }

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-green-900 to-black py-10 px-4 flex justify-center">
      <div className="max-w-4xl w-full bg-white/5 rounded-2xl shadow-lg p-6 md:p-10 text-white backdrop-blur-lg">
        {/* Image */}
        <div className="w-full h-64 md:h-96 overflow-hidden rounded-xl mb-6">
          <img
            src={disease.image}
            alt={disease.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-400 mb-6">
          {disease.name}
        </h1>

        {/* Cause */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">สาเหตุ</h2>
          <p className="text-white/80 leading-relaxed">{disease.cause}</p>
        </div>

        {/* Treatment */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">การดูแลรักษา</h2>
          <p className="text-white/80 leading-relaxed">{disease.treatment}</p>
        </div>
      </div>
    </section>
  )
}

export default DiseaseBlog
