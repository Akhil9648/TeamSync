import express from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import authorizeRoles from "../middleware/roles.middleware";
import { activityLogs, getActivityLogById } from "../controllers/activity.controller";
const activityRouter=express.Router();
activityRouter.get('/',verifyJWT,authorizeRoles("Team Leader"),activityLogs);
activityRouter.get('/:id',verifyJWT,authorizeRoles("Team Leader"),getActivityLogById);
export default activityRouter;