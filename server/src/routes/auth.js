import express from 'express'
import * as authController from '../controllers/auth'
import { verifyPTITEmail } from '../middlewares/verifyToken'


const router = express.Router()

router.post('/register', verifyPTITEmail, authController.register)
router.get('/finalregister/:email/:token', authController.finalRegister)
router.post('/login', authController.login)


export default router