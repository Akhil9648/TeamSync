import express from "express";
import { getProfile, loginUser, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router=express.Router();
router.post("/register",registerUser)
router.post('/login',loginUser)
router.get('/profile',verifyJWT,getProfile)
export default router;