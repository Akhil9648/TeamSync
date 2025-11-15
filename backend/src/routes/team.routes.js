import express from "express";
import { verifyJWT as authenticate } from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/roles.middleware.js";

import {
  createTeam,
  deleteItems,
  getAllItems,
  getTeamById,
  updateTeam
} from "../controllers/team.controller.js";

const teamRouter = express.Router();

teamRouter.get("/", authenticate, authorizeRoles("Team Leader"), getAllItems);
teamRouter.get("/:id", authenticate, authorizeRoles("Team Leader"), getTeamById);
teamRouter.put("/:id", authenticate, authorizeRoles("Team Leader"), updateTeam);
teamRouter.delete("/:id", authenticate, authorizeRoles("Team Leader"), deleteItems);

export default teamRouter;
