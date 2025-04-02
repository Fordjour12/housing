import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { teamMember } from "./teamMember";

/** Property manager firm table for storing property management companies */
export const propertyManagerFirm = pgTable("property_manager_firm", {
	id: serial("id").primaryKey(),
	userId: serial("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	businessName: text("business_name").notNull(),
	streetAddress: text("street_address").notNull(),
	unitNumber: text("unit_number"),
	city: text("city").notNull(),
	state: text("state").notNull(),
	zip: text("zip").notNull(),
	phoneNumber: text("phone_number").notNull(),
	website: text("website"),
	propertiesCount: integer("properties_count"),
	defaultContactEmail: text("default_contact_email").notNull(),
	defaultContactPhone: text("default_contact_phone").notNull(),
	notifyNewInquiries: text("notify_new_inquiries").default("true").notNull(),
	notifyMaintenanceRequests: text("notify_maintenance_requests")
		.default("true")
		.notNull(),
	notifyRentReminders: text("notify_rent_reminders").default("true").notNull(),
	notifyLeaseExpirations: text("notify_lease_expirations")
		.default("true")
		.notNull(),
	applicationProcess: text("application_process").notNull(),
	screeningCreditCheck: text("screening_credit_check")
		.default("true")
		.notNull(),
	screeningBackgroundCheck: text("screening_background_check")
		.default("true")
		.notNull(),
	screeningIncomeVerification: text("screening_income_verification")
		.default("true")
		.notNull(),
	leaseSigningPreference: text("lease_signing_preference").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** Relations for the property manager firm table */
export const propertyManagerFirmRelations = relations(
	propertyManagerFirm,
	({ one, many }) => ({
		user: one(user, {
			fields: [propertyManagerFirm.userId],
			references: [user.id],
		}),
		teamMembers: many(teamMember),
	}),
);

/** Type for selecting property manager firms */
export type SelectPropertyManagerFirm = typeof propertyManagerFirm.$inferSelect;

/** Type for inserting property manager firms */
export type InsertPropertyManagerFirm = typeof propertyManagerFirm.$inferInsert;
