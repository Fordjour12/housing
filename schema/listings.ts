import { sql } from "drizzle-orm";
import {
	text,
	timestamp,
	pgTable,
	uuid,
	integer,
	boolean,
	decimal,
	pgEnum,
	jsonb,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const listingStatusEnum = pgEnum("listing_status", [
	"active",
	"pending",
	"inactive",
]);

export const listings = pgTable("listings", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	price: decimal("price", { precision: 10, scale: 2 }).notNull(),
	bedrooms: integer("bedrooms").notNull(),
	bathrooms: integer("bathrooms").notNull(),
	squareFeet: integer("square_feet").notNull(),
	address: text("address").notNull(),
	city: text("city").notNull(),
	state: text("state").notNull(),
	zipCode: text("zip_code").notNull(),
	images: jsonb("images").$type<string[]>().default([]),
	amenities: jsonb("amenities").$type<string[]>().default([]),
	status: listingStatusEnum("status").default("pending").notNull(),
	isAvailable: boolean("is_available").default(true).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
	propertyManagerId: text("property_manager_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export type Listing = typeof listings.$inferSelect;
export type NewListing = typeof listings.$inferInsert;
