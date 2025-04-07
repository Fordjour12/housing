import {
	pgTable,
	text,
	timestamp,
	boolean,
	integer,
	numeric,
	pgEnum,
	PgArray,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { favorite } from "./favorite";
import { propertyAssignment } from "./propertyAssignment";
import { leaseAgreements } from "./leaseAgreements";
import { tenantFeedback } from "./tenantFeedback";
import { rentPayments } from "./rentPayments";
import { propertyAvailability } from "./propertyAvailability";
import { propertyPerformanceReports } from "./propertyPerformanceReports";
import { maintenanceTickets } from "./maintenanceTickets";

/** Enum for property status */
export const propertyStatusEnum = pgEnum("property_status", [
	"active",
	"pending",
	"inactive",
]);

/** Property table for managing rental properties */
export const property = pgTable("property", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	streetAddress: text("street_address").notNull(),
	unitNumber: text("unit_number"),
	city: text("city").notNull(),
	state: text("state").notNull(),
	zip: text("zip").notNull(),
	propertyType: text("property_type").notNull(),
	bedrooms: integer("bedrooms").notNull(),
	bathrooms: integer("bathrooms").notNull(),
	squareFeet: integer("square_feet"),
	yearBuilt: text("year_built"),
	rentAmount: numeric("rent_amount", { precision: 10, scale: 2 }).notNull(),
	securityDeposit: numeric("security_deposit", {
		precision: 10,
		scale: 2,
	}).notNull(),
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
	isAvailable: boolean("is_available").default(true).notNull(),
	status: propertyStatusEnum("status").default("pending").notNull(),
	ownerId: text("owner_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	propertyManagerId: text("property_manager_id").references(() => user.id, {
		onDelete: "set null",
	}),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** Relations for the property table */
export const propertyRelations = relations(property, ({ one, many }) => ({
	owner: one(user, {
		fields: [property.ownerId],
		references: [user.id],
		relationName: "owner",
	}),
	propertyManager: one(user, {
		fields: [property.propertyManagerId],
		references: [user.id],
		relationName: "property_manager",
	}),
	favorites: many(favorite),
	assignments: many(propertyAssignment),
	leaseAgreements: many(leaseAgreements),
	tenantFeedback: many(tenantFeedback),
	rentPayments: many(rentPayments),
	availability: many(propertyAvailability),
	performanceReports: many(propertyPerformanceReports),
	maintenanceTickets: many(maintenanceTickets),
}));

/** Type for selecting properties */
export type SelectProperty = typeof property.$inferSelect;

/** Type for inserting properties */
export type InsertProperty = typeof property.$inferInsert;
