import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config();

export default defineConfig({
	schema: "./schema/index.ts",

	dbCredentials: {
		url: process.env.POSTGRES_URL as string,
	},

	verbose: true,
	strict: true,
	dialect: "postgresql",
});
