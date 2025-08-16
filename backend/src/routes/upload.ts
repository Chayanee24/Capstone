//route/upload.ts
import express from 'express'
import multer from 'multer'
import { uploadImageAndAnalyze } from '../controllers/uploadController'

const upload = multer()

const router = express.Router()

router.post('/analyze', upload.single('image'), uploadImageAndAnalyze)

export default router