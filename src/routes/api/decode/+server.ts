import { json } from "@sveltejs/kit";
import Jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";

export async function POST({ request }){
    const data = await request.json();
    const decoded = Jwt.verify(data.token, env.JWT_SECRET);
    return json({decoded});
}
