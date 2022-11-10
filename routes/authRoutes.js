import express from 'express'
import AuthController from '../controllers/AuthControllers.js'
const router = express.Router()

router.get('/', AuthController.home)

router.post('/auth/register', AuthController.loginPost)

export default router