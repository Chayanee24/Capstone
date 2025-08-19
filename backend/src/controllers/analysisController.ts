import { RequestHandler } from "express"
import supabase from "../services/supabase"
import { updateDiseaseStatisticService } from "../services/statisticsService"

export const saveAnalysisResult: RequestHandler = async (req, res) => {
  try {
    const { imageID, prediction, imageUrl } = res.locals.analysisData

    // 📌 หา disease id
    const { data: diseaseData, error: diseaseError } = await supabase
      .from("DiseaseInformations")
      .select("id")
      .eq("disease_name", prediction)
      .single()

    if (diseaseError || !diseaseData) {
      res.status(500).json({ error: "Disease not found" })
      return
    }

    const diseaseId = diseaseData.id

    //console.log(diseaseId)
    //console.log(imageID)
    //console.log(prediction)

    // 📌 บันทึกผลการวิเคราะห์
    await supabase.from("AnalysisResults").insert([
      {
        disease_id : diseaseId || null,
        image_id : imageID || null,
        predicted_deficiency : prediction || null,
      },
    ])

    // 📌 ดึง lat/long จาก RiceImages
    const { data: riceImage } = await supabase
      .from("RiceImages")
      .select("latitude, longitude")
      .eq("id", imageID)
      .single()

    let statisticResult = null
    if (riceImage) {
      //console.log(riceImage.latitude)
      //console.log(riceImage.longitude)
      statisticResult = await updateDiseaseStatisticService(
        prediction,
        riceImage.latitude,
        riceImage.longitude
      )
    }

    res.json({
      message: "Upload + Analysis + Save successful",
      imageUrl,
      prediction,
      diseaseId,
      statisticResult,
    })
  } catch (error: any) {
    res.status(500).json({
      error: "Error saving analysis result",
      detail: error.message,
    })
  }
}
