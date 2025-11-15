import Activity from "../models/activity.model.js";
// controllers/activity.controller.js
export const getActivityLogs = async (req, res, next) => {
  try {
    const logs = await Activity.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(50);
    
    const formattedLogs = logs.map(log => ({
      _id: log._id,
      user: log.user,
      action: log.action,
      type: log.type,
      timestamp: getRelativeTime(log.createdAt),
      createdAt: log.createdAt
    }));
    
    res.status(200).json(formattedLogs);
  } catch (error) {
    console.error('Get activity logs error:', error);
    next(error);
  }
};

export const exportActivityLogs = async (req, res, next) => {
  try {
    const logs = await Activity.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json(logs);
  } catch (error) {
    console.error('Export activity logs error:', error);
    next(error);
  }
};

export const getActivityLogById = async (req, res, next) => {
  try {
    const log = await Activity.findById(req.params.id)
      .populate('user', 'name email');
    
    if (!log) {
      return res.status(404).json({ message: "Activity log not found" });
    }
    
    res.status(200).json(log);
  } catch (error) {
    console.error('Get activity log by ID error:', error);
    next(error);
  }
};

function getRelativeTime(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return new Date(date).toLocaleDateString();
}

// Helper function
export const createActivityLog = async (userId, action, type = 'other', targetType = null, targetId = null) => {
  try {
    await Activity.create({ 
      user: userId, 
      action, 
      type,
      targetType,
      targetId
    });
  } catch (error) {
    console.error('Create activity log error:', error);
  }
};
