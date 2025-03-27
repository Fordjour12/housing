import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { property } from "./property-schema";

export const favorite = pgTable("favorite", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	propertyId: text("property_id")
		.notNull()
		.references(() => property.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

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

export type Favorite = typeof favorite.$inferSelect; 