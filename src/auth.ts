import { SvelteKitAuth } from "@auth/sveltekit"
import Credentials from "@auth/sveltekit/providers/credentials"
import type { JWT } from "@auth/core/jwt"
import { change } from "./store"
import { CredentialsSignin } from "@auth/core/errors"

export const { handle, signIn, signOut } = SvelteKitAuth({

  trustHost: true,
  
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        try {
          const response = await fetch('http://localhost:5173/api/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
          })
          if (!response.ok) {
            return null
          } else {
            const user = await response.json()
            if (user.error) {
              throw new CredentialsSignin({ message: user.error, code: "credentials-signin" });
            }
            change(user.success)
            return { ...user };
          }
        } catch (error) {
          console.log("error",error)
        }
      },
    }),
  ],
  pages: {
    signOut: "/signOut",
    error: "/error",
  },
  trustHost: true,
})