import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";  
import authorizeRoles from "../middleware/roles.middleware.js";  
import Activity from "../models/activity.model.js";  // ✅ Add this import
import { 
  getActivityLogs, 
  getActivityLogById,
  exportActivityLogs 
} from "../controllers/activity.controller.js";  

const activityRouter = express.Router();
activityRouter.get('/seed', async (req, res) => {
  try {
    const userId = '69170418d3ff31612073f859';  
    
    const testLogs = [
      { user: userId, action: 'Created new team "Engineering"', type: 'team' },
      { user: userId, action: 'Updated user profile settings', type: 'user' },
      { user: userId, action: 'Completed task "API Integration"', type: 'task' },
      { user: userId, action: 'Deleted team "Marketing"', type: 'team' },
      { user: userId, action: 'Added new member to Design team', type: 'team' },
    ];
    
    await Activity.insertMany(testLogs);
    
    res.json({ message: '5 test activity logs created successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
activityRouter.get('/export', verifyJWT, authorizeRoles("Team Leader"), exportActivityLogs);
activityRouter.get('/', verifyJWT, authorizeRoles("Team Leader"), getActivityLogs);
activityRouter.get('/:id', verifyJWT, authorizeRoles("Team Leader"), getActivityLogById);
export default activityRouter;
