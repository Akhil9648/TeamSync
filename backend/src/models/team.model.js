import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  tasks: {
    type: Number,
    default: 0
  },
  completion: {  // ✅ Add this if missing
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

const Team = mongoose.model('Team', teamSchema);
export default Team;
