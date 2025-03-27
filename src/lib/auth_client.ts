import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/solid";

const isURL = "http://localhost:4000/api/auth";

export const authClient = createAuthClient({
  fetchOptions: {
    baseURL: isURL,
  },
  plugins: [adminClient()],
});

export const { signIn, signUp, useSession, signOut } = authClient;
