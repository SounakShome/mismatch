import { json } from "@sveltejs/kit";
import { createToken } from "$lib/token";
import connectDB from "../../../middleware/mongoose";
import User from "../../../models/user";
import Jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";
import Nodemailer from "nodemailer";

export async function POST({ request }) {
    try {
        await connectDB();
        const data = await request.json();
        const email = data.email;
        const user = await User.findOne({ email: email });
        if (user) {
            const token = await createToken(email);
            await send(data.email, token);
            const otp = Jwt.sign(token, env.JWT_SECRET);
            return json({ otp, status: 200 }, { status: 200 });
        } else {
            return json({ message: "Email does not exist" }, { status: 400 });
        }
    } catch (error) {
        console.log(error);
        return json({ message: "Internal server error" }, { status: 500 });
    }
}

async function send(email: string, url: string) {
    const transporter = Nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "mismatch25vitc@gmail.com",
            pass: env.APP_PASSWORD
        }
    });

    transporter.sendMail({
        to: email,
        subject: "Verify your Email!",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
                <h1 style="color: #333; text-align: center;">Email Verification</h1>
                <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Thank you for registering. Please use the following OTP to verify your email address:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <span style="font-size: 32px; font-weight: bold; color: #0066cc; letter-spacing: 5px; padding: 10px 20px; border: 2px dashed #0066cc; border-radius: 5px;">${url}</span>
                </div>
                <p style="font-size: 14px; color: #777; margin-top: 20px;">If you did not request this verification, please ignore this email.</p>
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; color: #999; font-size: 12px;">
                    <p>&copy; ${new Date().getFullYear()} Mismatch. All rights reserved.</p>
                </div>
            </div>
        `
    }).then(() => {
        console.log("Email sent successfully");
    }).catch((err) => {
        console.error(err);
    });
}