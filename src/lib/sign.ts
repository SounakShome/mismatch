import { signIn } from "@auth/sveltekit/client";

export default async function sign(email: string, password:string){
    const res = await signIn("credentials", { email, password, redirect: true });
    console.log(res);
    return res;
}