import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as authSchema from "~/schema/auth-schema";
import { nurseryDb } from "~/service";

export const auth = betterAuth({
  database: drizzleAdapter(nurseryDb, {
    provider: "pg",
    schema: {
      ...authSchema,
      user: authSchema.user,
    }
  }),
  emailAndPassword: {
    enabled: true
  },
});
