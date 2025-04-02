import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/** Verification table for storing verification tokens */
export const verification = pgTable("verification", {
	id: serial("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** Type for selecting verifications */
export type SelectVerification = typeof verification.$inferSelect;

/** Type for inserting verifications */
export type InsertVerification = typeof verification.$inferInsert;
