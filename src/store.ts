import { get, writable } from "svelte/store";
import Jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";

export const deet = writable("");

export const change = (data: object) => {
    const val = Jwt.sign(JSON.stringify(data), env.JWT_SECRET);
    deet.set(val);
}