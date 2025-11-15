import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    avatarURL:{
        type:String,
    },
    team:{
        type:String,
        ref:"Team"
    },
    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    }
},{timestamps:true})
const User=mongoose.model('User',userSchema)
export default User;