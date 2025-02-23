import type { PageServerLoad } from "../$types"
import connectDB from "../../../middleware/mongoose";
import { env } from "$env/dynamic/private";
import Jwt from "jsonwebtoken";
import verification from "../../../models/verification";
import user from "../../../models/user";

export const load: PageServerLoad = async (events) => {
    try {
        await connectDB();
        const path = Jwt.verify(events.url.pathname.split("/")[2], env.JWT_SECRET);
        let email = "";
        let token = "";
        if (typeof path !== "string") {
            email = path.email;
            token = path.token;
        }
        const res = await verification.findOne({ email, token });
        if (res) {
            await verification.deleteOne({ _id: res._id });
            await user.updateOne({email:email}, {emailVerified: true})
            return { status: 200, body: { success: "Email verified" } };
        } else {
            await user.deleteOne({email:email})
            return { status: 400, body: { error: "Invalid token" } };
        }
    } catch (error) {
        console.log(error);
    }
}