import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";

/** Usage analytics table for tracking user actions */
export const usageAnalytics = pgTable("usage_analytics", {
	id: serial("id").primaryKey(),
	userId: serial("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	action: text("action").notNull(),
	timestamp: timestamp("timestamp").defaultNow().notNull(),
});

/** Relations for the usage analytics table */
export const usageAnalyticsRelations = relations(usageAnalytics, ({ one }) => ({
	user: one(user, {
		fields: [usageAnalytics.userId],
		references: [user.id],
	}),
}));

/** Type for selecting usage analytics */
export type SelectUsageAnalytics = typeof usageAnalytics.$inferSelect;

/** Type for inserting usage analytics */
export type InsertUsageAnalytics = typeof usageAnalytics.$inferInsert;
