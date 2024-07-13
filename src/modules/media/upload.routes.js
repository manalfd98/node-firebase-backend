import { Router } from 'express'
import uploadMiddleware from '../../middleware/upload.middleware.js'
import uploadImageController from './upload.controller.js'

const uploadRoutes = Router()
uploadRoutes.post(
  '/uploadImage',
  uploadMiddleware.single('image'),
  uploadImageController
)

export default uploadRoutes
