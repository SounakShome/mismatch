import type { LayoutServerLoad } from './$types';
import connectDB from "../middleware/mongoose";
import Jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";
import { get } from "svelte/store";
import { deet } from "../store";

export const load = (async (events) => {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
  }
  const token = events.cookies.get("deets");
  const details = get(deet);
  if (token) {
    const test = Jwt.verify(token, env.JWT_SECRET);
    return { session: true, deets: test, token };
  } else if(details.length > 0) {
    events.cookies.set("deets", details, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/"});
    const test = Jwt.verify(details, env.JWT_SECRET);
    return { session: true, deets: test, token: details };
  }else {
    return { session: false, deets: null, token: null };
  }

  // const val = get(deet);
  // if (val) {
  //   events.cookies.set("deets", val, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "strict",
  //     path: "/",
  //     maxAge: 60 * 60 * 24,
  //   });
  //   const testCookie = events.cookies.get("deets");
  //   const test = testCookie ? Jwt.verify(testCookie, env.JWT_SECRET) : null;
  //   return {
  //     session: true, deets: test, token:val
  //   }
  // } else {

  // }
}) satisfies LayoutServerLoad;