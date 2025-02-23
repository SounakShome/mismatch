import { get, writable } from "svelte/store";
import Jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";

export const count = writable("");

export const change = (data: object) => {
    const val = Jwt.sign(JSON.stringify(data), env.JWT_SECRET);
    count.set(val);
}