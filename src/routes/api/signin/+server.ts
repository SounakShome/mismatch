import { json } from "@sveltejs/kit";
import bcrypt from "bcryptjs";
import User from "../../../models/user";

export async function POST({ request }) {
    const data = await request.json();
    const user = await User.findOne({"email": data.email});
    if (!user) {
        return json({error: "User not found"});
    }
    if (user.emailVerified === false) {
        return json({error: "Email not verified"});
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        return json({error: "Invalid credentials"});
    }
    return json({
        success: {
            name: user.name,
            reg: user.reg,
            team: user.teamId,
            role: user.role
        }
    });
}
