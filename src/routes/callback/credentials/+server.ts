import { json } from "@sveltejs/kit";
import bcrypt from "bcryptjs";
import User from "../../../models/user";
import Jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";
import { change } from "../../../store";

export async function POST({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const { email, password } = data;
    
    if (typeof email !== 'string' || typeof password !== 'string') {
        return json({ error: "Invalid form data" });
    }
    
    const user = await User.findOne({ "email": email });
    if (!user) {
        return json({ error: "User not found" });
    }
    if (user.emailVerified === false) {
        return json({ error: "Email not verified" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return json({ error: "Invalid credentials" });
    }
    const session = {
        name: user.name,
        reg: user.reg,
        team: user.teamId,
        role: user.role
    }
    change(Jwt.sign(session, env.JWT_SECRET));
    return json({
        success: Jwt.sign(session, env.JWT_SECRET)
    });
}
