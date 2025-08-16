import { Request, Response, RequestHandler } from 'express'
import axios from 'axios'
import supabase from '../services/supabase'

export const uploadImageAndAnalyze: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    const file = req.file

    if (!file) {
      res.status(400).json({ error: 'No file uploaded' })
      return
    }

    const fileExt = file.originalname.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    // ✅ อัปโหลดไฟล์ไป Supabase storage
    const { error: uploadError } = await supabase.storage
      .from('up-loads')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true, // กันกรณีชื่อไฟล์ซ้ำ
      })

    if (uploadError) {
      console.error('❌ Upload error:', uploadError.message)
      res.status(500).json({ error: uploadError.message })
      return
    }

    // ✅ ดึง public URL
    const { data } = supabase.storage
      .from('up-loads')
      .getPublicUrl(filePath)

    const imageUrl = data.publicUrl

    // ✅ เรียก AI model มาวิเคราะห์
    const aiResponse = await axios.post('http://localhost:8000/uploads/analyze', {
      url: imageUrl,
    })

    // ✅ บันทึกลงฐานข้อมูล RiceImages
    const { data: riceImageData, error: riceImageError } = await supabase
      .from('RiceImages')
      .insert([
        {
          image_path: imageUrl,
          location: 'Thailand',
          user_id: 1,
        },
      ])
      .select('id');

    if (riceImageError) {
      console.error(riceImageError);
      throw new Error(riceImageError.message);
    }

    const insertedId = riceImageData?.[0]?.id;

    res.locals.analysisData = {
      imageID: insertedId,
      prediction: aiResponse.data.label,
      imageUrl, // เก็บเผื่อใช้ใน response
    };

    //console.log('🔥 analysisData set:', res.locals.analysisData);

    //ส่งต่อไปให้ saveAnalysisResult
    next();

  } catch (err: any) {
    console.error('❌ Unexpected error:', err.message || err)
    res.status(500).json({ error: 'Error processing request', detail: err.message })
  }
}
