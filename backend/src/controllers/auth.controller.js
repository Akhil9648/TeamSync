import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { imagekit } from "../server/imagekit.js";
import Team from "../models/team.model.js";

// REGISTER USER
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, avatarUrl } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Upload avatar if provided
    let uploadedAvatarUrl = null;
    if (avatarUrl) {
      const uploadImage = await imagekit.upload({
        file: avatarUrl,
        fileName: `${name}_avatar.jpg`,
        folder: "/avatars"
      });
      uploadedAvatarUrl = uploadImage.url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      avatarUrl: uploadedAvatarUrl
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    return res.status(201).json({
      message: "User registered successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl
      }
    });

  } catch (error) {
    next(error);
  }
};


// LOGIN USER
export const loginUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Email and password are required.");
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found.");
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid email or password.");
      return res.status(401).json({ message: "Invalid email or password." });
    }
    console.log("Login successful.");
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );


    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl
      }
    });

  } catch (error) {
    next(error);
  }
};


// GET PROFILE
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "User fetched successfully.",
      profile: user
    });

  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const self = req.params.id;      // user to delete
    const userId = req.user.id;      // logged-in admin

    if (self == userId) {
      return res.status(400).json({ message: "You can't delete your own account" });
    }

    // FIX 1: Use User model correctly
    const userToDelete = await User.findById(self);

    if (!userToDelete) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // FIX 2: Right delete function
    await User.findByIdAndDelete(self);

    return res.status(200).json({ message: "User Deleted Successfully" });

  } catch (error) {
    next(error);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    // sanitize undefined or null values for name/email
    const cleanedUsers = users.map(user => ({
      ...user.toObject(),
      name: user.name || "",
      email: user.email || "",
    }));

    return res.status(200).json(cleanedUsers);
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  try {
      const userId = req.params.id || req.user.id;
    const { name, email, role, team, status, avatarUrl } = req.body;
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      if(name)  user.name = name;
      if(email)  user.email = email;
      if(role)  user.role = role;
      if(avatarUrl)  user.avatarUrl = avatarUrl;
      await user.save();
      return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    next(error); 
  }
}
export const getUserById = async (req, res, next) => {
  try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if(!user) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
export const addUser = async (req, res, next) => {
  try {
      console.log(req.body);
      const {name,email,role,team,status,password}= req.body;
      const existingUser=await User.findOne({email});
      if(existingUser) return res.status(400).json({message:"User Already Exists"});
      const hashedPassword=await bcrypt.hash(password || 'DefaultPass123',10);
      const user=await User.create({
          name,
          email,
          password:hashedPassword,
          role,
          team,
          status
      });
      return res.status(201).json({message:"User Created Successfully",user});
  } catch (error) {
    console.error("Add user error:", error.message); 
    next(error);
  }
}
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    next(error);
  }
};
export const updateUserSettings = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword, notifications } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update basic info
    if (name) user.name = name;
    if (email) user.email = email;
    if (notifications) user.notifications = notifications;

    // Handle password change
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required' });
      }
      
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
      
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    res.status(200).json({ 
      message: 'Settings updated successfully',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Update settings error:', error);
    next(error);
  }
};
export const MyteamUsers = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Find all teams where the user is a leader or a member
    const teams = await Team.find({
      $or: [
        { leader: userId },
        { members: userId }
      ]
    });

    if (!teams.length) {
      return res.status(200).json([]);
    }

    // Collect all unique user IDs from these teams
    const userIds = new Set();
    teams.forEach(team => {
      if (team.leader) userIds.add(team.leader.toString());
      if (team.members && team.members.length > 0) {
        team.members.forEach(member => userIds.add(member.toString()));
      }
    });

    // Fetch the users using those IDs
    const teamUsers = await User.find({ _id: { $in: Array.from(userIds) } }).select("-password");
    
    // The frontend expects a simple array of users
    res.status(200).json(teamUsers);
  } catch (error) {
    console.error('Get my team users error:', error);
    next(error);
  }
}