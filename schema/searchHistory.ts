import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";

/** Search history table for storing user's property search history */
export const searchHistory = pgTable("search_history", {
	id: serial("id").primaryKey(),
	userId: serial("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	searchQuery: text("search_query").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** Relations for the search history table */
export const searchHistoryRelations = relations(searchHistory, ({ one }) => ({
	user: one(user, {
		fields: [searchHistory.userId],
		references: [user.id],
	}),
}));

/** Type for selecting search history */
export type SelectSearchHistory = typeof searchHistory.$inferSelect;

/** Type for inserting search history */
export type InsertSearchHistory = typeof searchHistory.$inferInsert;
