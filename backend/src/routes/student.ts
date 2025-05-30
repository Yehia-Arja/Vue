import { Router } from 'express'
import { getStudents } from '../controllers/studentController'
import { authenticate } from '../middleware/auth'

const router = Router()


router.get('/', authenticate, getStudents)

export default router
