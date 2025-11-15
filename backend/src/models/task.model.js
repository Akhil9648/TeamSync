import mongoose from "mongoose";
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    team:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team"
    },
    assignee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["Pending","In-Progress","Completed"],
        default:"Pending"
    },
    priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Medium"
    },
    dueDate:{
        type:Date
    },
    completedAt:{
        type:Date
    },
    comments:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }
},{timestamps:true})
const Task=mongoose.model('Task',taskSchema);
export default Task