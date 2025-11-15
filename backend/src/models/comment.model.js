import mongoose  from "mongoose";
const commentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"task"
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})
const Comment=mongoose.model("Comment",commentSchema);
export default Comment