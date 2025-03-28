import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/solid";

export const authClient = createAuthClient({
  fetchOptions: {
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:4000/api/auth",
  },
  plugins: [adminClient()],
});

export const { signIn, signUp, useSession, signOut } = authClient;
