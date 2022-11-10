import express from 'express'
import AuthController from '../controllers/AuthControllers.js'
import checkToken from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/', AuthController.home)

router.post('/auth/register', AuthController.registerPost)
router.post('/auth/login', AuthController.loginPost)

router.get('/users/:id', checkToken, AuthController.getUser)

export default router