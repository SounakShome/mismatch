import mongoose from "mongoose";
import { env } from "$env/dynamic/private";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }
    try {
        console.log("connecting");
        await mongoose.connect(env.MONGO_URI);
        console.log("connection established");
    } catch (error) {
        console.log("connection failed");
        console.log(error);
    }
};

export default connectDB;
