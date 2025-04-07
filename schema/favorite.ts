import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { property } from "./property";

/** Favorite table for storing user's favorite properties */
export const favorite = pgTable("favorite", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	propertyId: text("property_id")
		.notNull()
		.references(() => property.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** Relations for the favorite table */
export const favoriteRelations = relations(favorite, ({ one }) => ({
	user: one(user, {
		fields: [favorite.userId],
		references: [user.id],
	}),
	property: one(property, {
		fields: [favorite.propertyId],
		references: [property.id],
	}),
}));

/** Type for selecting favorites */
export type SelectFavorite = typeof favorite.$inferSelect;

/** Type for inserting favorites */
export type InsertFavorite = typeof favorite.$inferInsert;
