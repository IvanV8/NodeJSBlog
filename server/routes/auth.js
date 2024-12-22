import { Router } from 'express'
import {} from '../controllers/auth.js'

const router = new Router()

// register
router.post('/register', register)

//login
router.post('/login', login)

//get me
router.get('/me', getMe)


export default router