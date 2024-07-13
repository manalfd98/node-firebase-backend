import { Router } from 'express'
import authRoutes from '../modules/auth/auth.routes.js'
import uploadRoutes from '../modules/media/upload.routes.js'
import userRoutes from '../modules/user/user.route.js'

const route = Router()

export default function InitializeRoutes () {
  route.use('/auth', authRoutes)
  route.use("/user", userRoutes);
  route.use('/media', uploadRoutes)
  return route
}
