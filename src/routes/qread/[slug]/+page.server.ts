import Jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (events) => {
    const data = Jwt.verify(events.params.slug, env.JWT_SECRET);
    return {data};
}