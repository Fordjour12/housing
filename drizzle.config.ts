import type { Config } from "drizzle-kit";

if (!process.env.POSTGRES_URL) {
	throw new Error("POSTGRES_URL environment variable is not set");
}

export default {
	schema: "./schema/index.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.POSTGRES_URL,
	},
	verbose: true,
	strict: true,
} satisfies Config;
