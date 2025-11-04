import mongoose from "mongoose";
export const connectDB = async (mongoURI) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DataBase Connected Successfully");
    }
    catch(error){
        console.error(error.message);
    }
}