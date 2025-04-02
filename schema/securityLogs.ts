import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";

/** Security logs table for tracking security-related events */
export const securityLogs = pgTable("security_logs", {
	id: serial("id").primaryKey(),
	userId: serial("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	action: text("action").notNull(),
	timestamp: timestamp("timestamp").defaultNow().notNull(),
});

/** Relations for the security logs table */
export const securityLogsRelations = relations(securityLogs, ({ one }) => ({
	user: one(user, {
		fields: [securityLogs.userId],
		references: [user.id],
	}),
}));

/** Type for selecting security logs */
export type SelectSecurityLog = typeof securityLogs.$inferSelect;

/** Type for inserting security logs */
export type InsertSecurityLog = typeof securityLogs.$inferInsert;
