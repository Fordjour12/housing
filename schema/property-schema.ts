import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { favorite } from "./favorite-schema";

export const property = pgTable("property", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description"),
	streetAddress: text("street_address").notNull(),
	unitNumber: text("unit_number"),
	city: text("city").notNull(),
	state: text("state").notNull(),
	zip: text("zip").notNull(),
	propertyType: text("property_type").notNull(),
	bedrooms: text("bedrooms").notNull(),
	bathrooms: text("bathrooms").notNull(),
	squareFootage: text("square_feet"),
	yearBuilt: text("year_built"),
	rentAmount: text("rent_amount").notNull(),
	securityDeposit: text("security_deposit").notNull(),
	leaseDurations: text("lease_durations").array().notNull(),
	availabilityDate: timestamp("availability_date").notNull(),
	amenities: text("amenities").array(),
	petPolicy: text("pet_policy"),
	petRestrictions: text("pet_restrictions"),
	utilitiesIncluded: text("utilities_included").array(),
	contactDisplay: text("contact_display").notNull(),
	applicationProcess: text("application_process").notNull(),
	screeningPreferences: text("screening_preferences").array(),
	communicationPreferences: text("communication_preferences").array(),
	leaseSigningPreference: text("lease_signing_preference").notNull(),
	photos: text("photos").array(),
	isAvailable: boolean("is_available").notNull().default(true),
	ownerId: text("owner_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const propertyRelations = relations(property, ({ one, many }) => ({
	owner: one(user, {
		fields: [property.ownerId],
		references: [user.id],
	}),
	favorites: many(favorite),
}));

export type Property = typeof property.$inferSelect; 