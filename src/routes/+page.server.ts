import type { PageServerLoad } from "./$types"
import { count } from "../store";
import { get } from 'svelte/store';
import connectDB from "../middleware/mongoose";
import Jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";

export const load: PageServerLoad = async (events) => {
  try {
    connectDB();
  } catch (error) {
    console.log(error);
  }
  const token = events.cookies.get("authjs.session-token");
  if (token) {
    const val = get(count);
    if (val) {
      events.cookies.set("test", val, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    }
    const testCookie = events.cookies.get("test");
    const test = testCookie ? Jwt.verify(testCookie, env.JWT_SECRET) : null;
    return {
      token: token, name: test
    }
  } else {
    return {
      token: null, name: null
    }
  }
}