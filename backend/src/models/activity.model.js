import mongoose from "mongoose";
const ActivitySchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    action:{
        type:String,
        required:true
    },
    targetType:{
        type:String
    },
    targetId:{
        type:mongoose.Schema.Types.ObjectId
    }
},{timestamps:true})
const Activity=mongoose.model("Activity",ActivitySchema);
export default Activity