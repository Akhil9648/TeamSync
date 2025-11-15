import authorizeRoles from "../middleware/roles.middleware.js";
import express from 'express';
import { addUser, deleteUser, getAllUsers, getCurrentUser, getUserById, updateUser, updateUserSettings } from "../controllers/auth.controller.js";
import { verifyJWT as authenticate, verifyJWT } from "../middleware/auth.middleware.js";
import { createTeam } from "../controllers/team.controller.js";
const Userrouter=express.Router();
Userrouter.get('/',authenticate,authorizeRoles('Team Leader'),getAllUsers);
Userrouter.post('/',authenticate,authorizeRoles('Team Leader'),addUser);
Userrouter.put('/update-settings', verifyJWT,updateUserSettings );
Userrouter.get('/me',verifyJWT,getCurrentUser)
Userrouter.get('/:id',getUserById);
Userrouter.delete('/:id',authenticate,authorizeRoles('Team Leader'),deleteUser);
Userrouter.put('/:id',updateUser);
export default Userrouter;