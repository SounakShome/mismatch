import { json } from "@sveltejs/kit";
import bcrypt from "bcryptjs";
import connectDB from "../../../middleware/mongoose";
import User from "../../../models/user";
import { createToken } from "$lib/token";
import { sendVerificationRequest } from "$lib/authSendRequest";
import Jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";

export async function POST({ request }) {
    try {
        await connectDB();
        const data = await request.json();
        const salt = bcrypt.genSaltSync(15);
        const pass = bcrypt.hashSync(data.password, salt);
        let newUser = new User({name: data.username, email: data.email, password: pass});
        await newUser.save();
        
        //Genarate verification token
        const token = await createToken(data.email);
        //Send verification email
        const verify = {
            email: data.email,
            token: token
        }
        const url = Jwt.sign(verify, env.JWT_SECRET);
        await sendVerificationRequest(data.email, `http://localhost:5173/verify/${url}`);

        return json({cookie: data.username });        
    } catch (error) {
        const data = await request.json();
        const user = await User.findOne({"email": data.email});
        if (user) {
            await User.deleteOne({email: data.email});            
        }
        console.log(error);
        
    }
}