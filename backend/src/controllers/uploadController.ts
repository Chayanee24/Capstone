import { Request, Response, RequestHandler } from 'express'
import axios from 'axios'
import supabase from '../services/supabase'

export const uploadImageAndAnalyze: RequestHandler = async (req, res) => {
  const file = req.file

  if (!file) {
    res.status(400).json({ error: 'No file uploaded' })
    return
  }

  const fileExt = file.originalname.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('up-loads')
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
    })

  if (uploadError) {
    res.status(500).json({ error: uploadError.message })
    return
  }

  const { data } = supabase.storage
    .from('up-loads')
    .getPublicUrl(filePath)

  const imageUrl = data.publicUrl

  try {
    // 👇 ใช้เวลาแบบ ISO string
    const createdAt = new Date().toISOString()

    // 👇 วิเคราะห์ภาพด้วย AI
    const aiResponse = await axios.post('http://localhost:3000/predict', {
      url: imageUrl,
    })

    // 👇 ตอบกลับ
    res.json({
      message: 'Upload and analysis successful',
      imageUrl,
      prediction: aiResponse.data.prediction,
      //location: uploadLocation,
    })

    // 👇 บันทึกลงฐานข้อมูล
    await supabase.from('RiceImages').insert([
      {
        image_path: imageUrl,
        location: 'Thailand',
        user_id: 1
      }
    ])
  } catch (err) {
    res.status(500).json({ error: 'Error calling AI service', detail: (err as any).message })
  }
}