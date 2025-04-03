import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";

/** Saved searches table for storing user's saved property search criteria */
export const savedSearches = pgTable("saved_searches", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	searchCriteria: jsonb("search_criteria").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** Relations for the saved searches table */
export const savedSearchesRelations = relations(savedSearches, ({ one }) => ({
	user: one(user, {
		fields: [savedSearches.userId],
		references: [user.id],
	}),
}));

/** Type for selecting saved searches */
export type SelectSavedSearch = typeof savedSearches.$inferSelect;

/** Type for inserting saved searches */
export type InsertSavedSearch = typeof savedSearches.$inferInsert;
