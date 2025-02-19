import connectDB from "../middleware/mongoose";
import verification from "../models/verification";

export async function getUser(email: string){
    try {
        await connectDB();
        const token = verification.findOne({email: email});
        return token;
    } catch (error) {
        console.log(error);
    }
}