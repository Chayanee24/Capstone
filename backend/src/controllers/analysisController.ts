import { RequestHandler } from 'express'
import supabase from '../services/supabase'

export const saveAnalysisResult: RequestHandler = async (req, res) => {
    try {
      const { imageID, prediction, imageUrl } = res.locals.analysisData
  
      const { data: diseaseData, error: diseaseError } = await supabase
        .from('DiseaseInformations')
        .select('id')
        .eq('disease_name', prediction)
        .single()
  
      if (diseaseError) {
        console.error('❌ Disease lookup error:', diseaseError.message)
        res.status(500).json({ error: 'Disease not found', detail: diseaseError.message })
        return
      }
  
      const diseaseId = diseaseData.id
  
      await supabase.from('AnalysisResults').insert([
        {
          predicted_deficiency: prediction,
          image_id: imageID,
          disease_id: diseaseId,
        }
      ])
  
      res.json({
        message: 'Upload + Analysis + Save successful',
        imageUrl,
        prediction,
        diseaseId,
      })
  
    } catch (error) {
      res.status(500).json({
        error: 'Error saving analysis result',
        detail: (error as any).message
      })
    }
  }  