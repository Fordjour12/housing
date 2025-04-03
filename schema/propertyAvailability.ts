import { pgTable, serial, timestamp, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { property } from "./property";

/** Property availability table for tracking property availability periods */
export const propertyAvailability = pgTable("property_availability", {
	id: serial("id").primaryKey(),
	propertyId: serial("property_id")
		.notNull()
		.references(() => property.id, { onDelete: "cascade" }),
	availableFrom: date("available_from").notNull(),
	availableTo: date("available_to"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** Relations for the property availability table */
export const propertyAvailabilityRelations = relations(
	propertyAvailability,
	({ one }) => ({
		property: one(property, {
			fields: [propertyAvailability.propertyId],
			references: [property.id],
		}),
	}),
);

/** Type for selecting property availability */
export type SelectPropertyAvailability =
	typeof propertyAvailability.$inferSelect;

/** Type for inserting property availability */
export type InsertPropertyAvailability =
	typeof propertyAvailability.$inferInsert;
