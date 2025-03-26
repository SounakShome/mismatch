import { writable } from "svelte/store";

export const deet = writable("");

export const change = (data: string) => {
    const val = data;
    deet.set(val);
}