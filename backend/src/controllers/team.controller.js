import Team from "../models/team.model.js";
import User from "../models/user.model.js";

// ----------------------------------
// CREATE TEAM
// ----------------------------------
const createTeam = async (req, res, next) => {
  try {
    const { name, leader, members, tasks, completion } = req.body;
    
    // Validate leader if provided
    if (leader) {
      const leaderUser = await User.findById(leader);
      if (!leaderUser) {
        return res.status(404).json({ message: "Leader not found" });
      }
    }
    
    // Validate members if provided
    if (members && members.length > 0) {
      const validMembers = await User.find({ _id: { $in: members } });
      if (validMembers.length !== members.length) {
        return res.status(400).json({ message: "Some members not found" });
      }
    }
    
    const newTeam = await Team.create({
      name,
      leader: leader || null,
      members: members || [],
      tasks: tasks || 0,
      completion: completion || 0
    });
    
    return res.status(201).json({
      message: "Team created successfully",
      team: newTeam
    });
  } catch (error) {
    console.error("Create team error:", error.message);
    next(error);
  }
};

export const getAllTeams = async (req, res, next) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'name email')
      .populate('members', 'name email');  // ✅ Populate members too
      console.log(teams);
    res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
};

// ----------------------------------
// GET ALL TEAMS
// ----------------------------------
const getAllItems = async (req, res, next) => {
  try {
    const teams = await Team.find()
      .populate("leader", "name email")
      .populate("members", "name email");

    res.json(teams);
  } catch (error) {
    next(error);
  }
};

// ----------------------------------
// GET TEAM BY ID
// ----------------------------------
const getTeamById = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("leader", "name email")
      .populate("members", "name email"); // FIXED

    if (!team) return res.status(404).json({ message: "Team Not Found" });

    res.json(team);
  } catch (error) {
    next(error);
  }
};

// ----------------------------------
// UPDATE TEAM
// ----------------------------------
const updateTeam = async (req, res, next) => {
  try {
    const { name, leader, members, tasks, completion } = req.body;
    
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      { 
        name, 
        leader: leader || null, 
        members: members || [], 
        tasks: tasks || 0, 
        completion: completion || 0 
      },
      { new: true }
    ).populate('leader', 'name email').populate('members', 'name email');
    
    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }
    
    res.status(200).json({ 
      message: "Team updated successfully", 
      team: updatedTeam 
    });
  } catch (error) {
    console.error('Update team error:', error);
    next(error);
  }
};

// ----------------------------------
// DELETE TEAM
// ----------------------------------
const deleteItems = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team Not Found" });

    await Team.findByIdAndDelete(req.params.id);

    res.json({ message: "Team Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
// Add this to your backend temporarily and call it once
export const fixTeams = async (req, res) => {
  try {
    await Team.updateMany(
      {},
      { $set: { completion: 0, tasks: 0 } }
    );
    res.json({ message: 'Teams updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add route: teamRouter.get('/fix', fixTeams);
// Then visit: http://localhost:3000/api/team/fix

export { createTeam, deleteItems, updateTeam, getAllItems, getTeamById };
