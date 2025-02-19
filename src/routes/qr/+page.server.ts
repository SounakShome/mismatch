import Jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (events) => {
  const token = {reg: "22BLC1135", name: "Sounak Shome"}
  return {token: Jwt.sign(token, env.JWT_SECRET)};
}

