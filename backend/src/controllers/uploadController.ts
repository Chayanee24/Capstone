import { RequestHandler } from "express"
import axios from "axios"
import supabase from "../services/supabase"

export const uploadImageAndAnalyze: RequestHandler = async (req, res, next) => {
  try {
    const file = req.file
    const { latitude, longitude } = req.body

    if (!file) {
      res.status(400).json({ error: "No file uploaded" })
      return
    }

    const fileExt = file.originalname.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    // ✅ อัปโหลดไป storage
    const { error: uploadError } = await supabase.storage
      .from("up-loads")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      })

    if (uploadError) {
      res.status(500).json({ error: uploadError.message })
      return
    }

    // ✅ public URL
    const { data } = supabase.storage.from("up-loads").getPublicUrl(filePath)
    const imageUrl = data.publicUrl

    // ✅ เรียก AI วิเคราะห์
    const aiResponse = await axios.post("http://localhost:8000/uploads/analyze", {
      url: imageUrl,
    })

    // ✅ insert ลง RiceImages
    const { data: riceImageData, error: riceImageError } = await supabase
      .from("RiceImages")
      .insert([
        {
          image_path: imageUrl,
          latitude,
          longitude,
          user_id: 1,
        },
      ])
      .select("id")

    if (riceImageError) throw new Error(riceImageError.message)

    const insertedId = riceImageData?.[0]?.id

    res.locals.analysisData = {
      imageID: insertedId,
      prediction: aiResponse.data.label,
      imageUrl,
    }

    next()
  } catch (err: any) {
    res.status(500).json({ error: "Error processing request", detail: err.message })
  }
}
