import { pgTable, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";

/** Notification preferences table for storing user notification settings */
export const notificationPreferences = pgTable("notification_preferences", {
	id: serial("id").primaryKey(),
	userId: serial("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	emailNotifications: boolean("email_notifications").default(true).notNull(),
	smsNotifications: boolean("sms_notifications").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
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
