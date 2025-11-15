import Team from "../models/team.model.js";
import User from "../models/user.model.js";

// ----------------------------------
// CREATE TEAM
// ----------------------------------
const createTeam = async (req, res, next) => {
  try {
    const { name, leaderId, memberIds } = req.body;

    // Check Leader
    const leader = await User.findById(leaderId);
    if (!leader) return res.status(404).json({ message: "Leader Not Found" });

    // Check Members
    const members = await User.find({ _id: { $in: memberIds } });

    const newTeam = await Team.create({
      name,
      leader: leaderId,
      members: members.map((m) => m._id),
    });

    return res.status(201).json({
      message: "Team Created Successfully",
      newTeam,
    });
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
    const { name, leaderId, memberIds } = req.body;

    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team Not Found" });

    if (name) team.name = name;

    if (leaderId) {
      const leader = await User.findById(leaderId);
      if (!leader)
        return res.status(404).json({ message: "Leader Not Found" });

      team.leader = leaderId;
    }

    if (memberIds) {
      const members = await User.find({ _id: { $in: memberIds } }); // FIXED: added await
      team.members = members.map((m) => m._id);
    }

    await team.save();

    res.json({ message: "Team Updated Successfully", team });
  } catch (error) {
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

export { createTeam, deleteItems, updateTeam, getAllItems, getTeamById };
