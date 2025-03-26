import { json } from "@sveltejs/kit";
import Jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";

export async function POST({ request }) {
    const res = await request.json();
    const data = res.currOtp;
    const token = Jwt.verify(res.otp, env.JWT_SECRET);
    return json({ verify: data==token, status:200 }, { status: 200 });
}
