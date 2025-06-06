import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/database";
import * as schema from "@/schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema,
	}),
	plugins: [nextCookies()],
});

