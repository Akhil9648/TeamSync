import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import Team from "../models/team.model.js";
const newTask=async(req,res,next)=>{
    try {
        const {title,assignee,description,status,priority,dueDate}=req.body;
        const admin=User.findById(assignee);
        if(!admin) return res.status(404).json({message:"Admin Not found"});
        const newTask=new Task({
            title,
            description,
            assignee,
            status,
            priority,
            dueDate
        });
        await newTask.save();
        res.status(200).json({message:"Task Created Successfully",newTask})
    } catch (error) {
        next(error)
    }
};
const getAllTasks = async (req, res, next) => {
  try {
    const { status, assignee, team } = req.query;

    // Initialize filter as empty object before use
    const filter = {};

    if (status) filter.status = status;
    if (assignee) filter.assignee = assignee;
    if (team) filter.team = team;

    const tasks = await Task.find(filter)
      .populate('assignee', 'name email')
      .populate('team', 'name')
      .populate('creator', 'name email')
      .sort({ dueDate: 1 });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTaskById=async(req,res,next)=>{
    try {
        const task=await Task.findById(req.params.id)
        .populate("assignee","name email")
        .populate("team","name")
        .populate("creator","name email");
        if(!task) return res.status(404).json({message:"Task Not Found"});
        res.status(200).json({task});
    } catch (error) {
        next(error);
    }
}
const updateTask=async(req,res,next)=>{
    try {
        const {title,assigneeId,description,status,priority,dueDate}=req.body;
        const task=await Task.findById(req.params.id);
        if(!task) return res.status(404).json({message:"Task Not Found"});
        if(title) task.title=title;
        if(assigneeId){
        const assignee=await User.findById(assigneeId);
        if(!assignee) return res.status(400).json({message:"Assignee is required"});
        task.assignee=assigneeId;
        }
        if(description) task.description=description;
        if(status) task.status=status;
        if(priority) task.priority=priority;
        if(dueDate) task.dueDate=dueDate;
        await task.save();
        res.status(200).json({message:"Task Updated Successfully",task});
    } catch (error) {
        next(error);
    }
};
const deleteTask=async(req,res,next)=>{
    try {
        const task=Task.findById(req.params.id);
        if(!task) return res.status(404).json({message:"Task Not Found"});
        await task.deleteOne();
        res.status(200).json({message:"Task Deleted Successfully"});
    } catch (error) {
        next(error);
    }
};
export {newTask,getAllTasks,getTaskById,updateTask,deleteTask};