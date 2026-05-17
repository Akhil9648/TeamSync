import express from "express";
import { verifyJWT as authenticate } from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/roles.middleware.js";

import {
  createTeam,
  deleteItems,
  fixTeams,
  getMyTeams,
  getAllItems,
  getTeamById,
  updateTeam
} from "../controllers/team.controller.js";
import Team from "../models/team.model.js";

const teamRouter = express.Router();

teamRouter.get('/fix', fixTeams);
teamRouter.get("/", authenticate, getMyTeams);
teamRouter.get("/:id", authenticate, getTeamById);
teamRouter.post('/',authenticate,authorizeRoles('Team Leader'),createTeam);
teamRouter.put("/:id", authenticate, updateTeam);
teamRouter.delete("/:id", authenticate, authorizeRoles("Team Leader"), deleteItems);
export default teamRouter;
