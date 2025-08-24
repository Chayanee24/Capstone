// src/routes/users.ts
import express from 'express'
import { registerUser, loginUser, getUsers } from '../controllers/userController'

const router = express.Router()

router.get('/:email', getUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router;
