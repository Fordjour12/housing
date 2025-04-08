import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";

/** Notification preferences table for storing user notification settings */
export const notificationPreferences = pgTable("notification_preferences", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	emailNotifications: boolean("email_notifications").default(true).notNull(),
	pushNotifications: boolean("push_notifications").default(false).notNull(),
	newListings: boolean("new_listings").default(true).notNull(),
	applicationUpdates: boolean("application_updates").default(true).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** Relations for the notification preferences table */
export const notificationPreferencesRelations = relations(
	notificationPreferences,
	({ one }) => ({
		user: one(user, {
			fields: [notificationPreferences.userId],
			references: [user.id],
		}),
	}),
);

/** Type for selecting notification preferences */
export type SelectNotificationPreferences =
	typeof notificationPreferences.$inferSelect;

/** Type for inserting notification preferences */
export type InsertNotificationPreferences =
	typeof notificationPreferences.$inferInsert;
