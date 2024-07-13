import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth.middleware.js'
import userController from './user.controller.js'

const userRoutes = Router()

userRoutes.post('/profile', authenticateToken, userController.getProfile)
userRoutes.put(
  '/updateProfile',
  authenticateToken,
  userController.updateUserProfile
)

export default userRoutes
