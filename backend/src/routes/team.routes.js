import express from "express";
import { verifyJWT as authenticate } from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/roles.middleware.js";

import {
  createTeam,
  deleteItems,
  fixTeams,
  getAllItems,
  getTeamById,
  updateTeam
} from "../controllers/team.controller.js";
import Team from "../models/team.model.js";

const teamRouter = express.Router();

teamRouter.get('/fix', fixTeams);
teamRouter.get("/", authenticate, authorizeRoles("Team Leader"), getAllItems);
teamRouter.get("/my-teams", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const teams = await Team.find({
      $or: [
        { leaderId: userId },
        { memberIds: { $in: [userId] } }
      ]
    })
    .populate("leaderId", "name email")
    .populate("memberIds", "name email");

    res.json({ teams });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
teamRouter.get("/:id", authenticate, authorizeRoles("Team Leader"), getTeamById);
teamRouter.post('/',authenticate,authorizeRoles('Team Leader'),createTeam);
teamRouter.put("/:id", authenticate, authorizeRoles("Team Leader"), updateTeam);
teamRouter.delete("/:id", authenticate, authorizeRoles("Team Leader"), deleteItems);
export default teamRouter;
