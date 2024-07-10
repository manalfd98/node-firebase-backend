import { Router } from 'express'
import { signUp,login } from './auth.controller.js'

const routes = Router()

routes.get('/sign-up', signUp)
routes.get('/login', login)

export default { routes }
