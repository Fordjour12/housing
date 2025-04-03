import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";

/** Messages table for storing user-to-user messages */
export const messages = pgTable("messages", {
	id: text("id").primaryKey(),
	senderId: text("sender_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	receiverId: text("receiver_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	content: text("content").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** Relations for the messages table */
export const messagesRelations = relations(messages, ({ one }) => ({
	sender: one(user, {
		fields: [messages.senderId],
		references: [user.id],
	}),
	receiver: one(user, {
		fields: [messages.receiverId],
		references: [user.id],
	}),
}));

/** Type for selecting messages */
export type SelectMessage = typeof messages.$inferSelect;

/** Type for inserting messages */
export type InsertMessage = typeof messages.$inferInsert;
