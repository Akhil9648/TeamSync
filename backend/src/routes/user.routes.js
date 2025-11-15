import authorizeRoles from "../middleware/roles.middleware.js";
import express from 'express';
import { deleteUser } from "../controllers/auth.controller.js";
import { verifyJWT as authenticate } from "../middleware/auth.middleware.js";
import { createTeam } from "../controllers/team.controller.js";
const Userrouter=express.Router();
Userrouter.post('/newteam',authenticate,authorizeRoles('Team Leader'),createTeam);
Userrouter.delete('/:id',authenticate,authorizeRoles('Team Leader'),deleteUser);
export default Userrouter;