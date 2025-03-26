import type { LayoutServerLoad } from './$types';
import { deet } from "../store";
import { get } from 'svelte/store';
import connectDB from "../middleware/mongoose";
import Jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";

export const load = (async (events) => {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
  }
  const val = get(deet);
  if (val) {
    events.cookies.set("deets", val, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }
  const testCookie = events.cookies.get("deets");
  const test = testCookie ? Jwt.verify(testCookie, env.JWT_SECRET) : null;
  return {
    session: true, deets: test, token:val
  }
}) satisfies LayoutServerLoad;