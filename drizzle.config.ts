import type { Config } from "drizzle-kit";
import { env } from "@/app/env";

if (!env.POSTGRES_URL) {
	throw new Error("POSTGRES_URL environment variable is not set");
}

export default {
	schema: "./schema/index.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: env.POSTGRES_URL,
	},
	verbose: true,
	strict: true,
} satisfies Config;
