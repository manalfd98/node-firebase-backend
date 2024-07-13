import { Router } from 'express'
import authController from './auth.controller.js'
import { authenticateToken } from '../../middleware/auth.middleware.js'

const authRoutes = Router()
authRoutes.post('/createUser', authController.createUserWithToken)
authRoutes.post('/signinWithToken', authController.signinWithCustomToken)


export default authRoutes
